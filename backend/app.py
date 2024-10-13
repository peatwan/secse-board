from flask import Flask, jsonify, request
import os
from datetime import datetime
from loguru import logger
from loguru._defaults import LOGURU_FORMAT
import shutil
from utils.strutil import (
    convert_dict_from_snake_to_camel_case,
    convert_dict_from_camel_to_snake_case,
)
from utils.config import Config
import json

app = Flask(__name__)


# Root route with /secse in the path
@app.route("/secse", methods=["GET"])
def index():
    return "Welcome to the SECSE API!", 200


# Route to list all files and folders in a directory
@app.route("/secse/list_directory", methods=["GET"])
def list_directory():
    # Get directory path from request arguments
    directory = request.args.get("directory")

    # Get directory if it is a file
    if os.path.isfile(directory):
        index = directory.rfind("/")
        directory = directory[:index]

    # Validate if directory is provided and exists
    if not directory or not os.path.exists(directory):
        return jsonify({"error": "Directory not provided or does not exist"}), 400

    # Prepare the response
    itemsInfo = []

    # Get list of items in the provided directory
    for item in os.listdir(directory):
        itemPath = os.path.join(directory, item)
        # Get last modified time
        lastModifiedTime = os.path.getmtime(itemPath)
        lastModifiedTimeReadable = datetime.fromtimestamp(lastModifiedTime).isoformat()

        # Check if the item is a file or directory and append relevant info
        if os.path.isdir(itemPath):
            itemsInfo.append(
                {
                    "name": item,
                    "type": "folder",
                    "lastModified": lastModifiedTimeReadable,
                    "size": "-",  # Size is not applicable for directories
                }
            )
        elif os.path.isfile(itemPath):
            itemsInfo.append(
                {
                    "name": item,
                    "type": "file",
                    "lastModified": lastModifiedTimeReadable,
                    "size": os.path.getsize(itemPath),  # Get size for files
                }
            )

    return jsonify(itemsInfo), 200


# Route to create a new folder
@app.route("/secse/create_folder", methods=["POST"])
def create_folder():
    # Get directory and folder name from request data
    directory = request.json.get("directory")
    folder_name = request.json.get("folder_name")

    # Validate that directory and folder_name are provided
    if not directory or not folder_name:
        return jsonify({"error": "Directory and folder name must be provided"}), 400

    # Get directory if it is a file
    if os.path.isfile(directory):
        index = directory.rfind("/")
        directory = directory[:index]

    # Validate that the directory exists
    if not os.path.exists(directory):
        return jsonify({"error": "Directory does not exist"}), 400

    # Construct the full path for the new folder
    new_folder_path = os.path.join(directory, folder_name)

    # Check if the folder already exists
    if os.path.exists(new_folder_path):
        return jsonify({"error": "Folder already exists"}), 400

    # Try to create the folder
    try:
        os.makedirs(new_folder_path)
        return (
            jsonify({"message": "Folder created successfully", "folder": folder_name}),
            201,
        )
    except Exception as e:
        logger.error(e)
        return jsonify({"error": str(e)}), 500


# Create a new project
@app.route("/secse/create_project", methods=["POST"])
def create_project():
    # Get args from request data
    workingDirectory = request.json.get("workingDirectory")
    fragments = request.json.get("fragmentsFile")
    target = request.json.get("targetFile")
    project_code = request.json.get("projectName")

    # Validate args are provided
    if not workingDirectory or not fragments or not target or not project_code:
        return (
            jsonify(
                {
                    "error": "Working directory, fragments file, target file and project name must be provided"
                }
            ),
            400,
        )

    # Validate directory or file exist
    if not os.path.exists(workingDirectory):
        return jsonify({"error": "Working directory does not exist"}), 400
    if not os.path.exists(fragments) or not os.path.isfile(fragments):
        return jsonify({"error": "Fragments file does not exist"}), 400
    if not os.path.exists(target) or not os.path.isfile(target):
        return jsonify({"error": "Target file does not exist"}), 400

    # Construct the full path for the new project
    new_project_path = os.path.join(workingDirectory, project_code)

    # Check if the folder already exists
    if os.path.exists(new_project_path):
        return (
            jsonify({"error": "Project already exists, please choose another name"}),
            400,
        )

    # Try to create the project
    try:
        os.makedirs(new_project_path)
        # Path of the file to be copied
        source_config_file = "./data/config.ini"
        # Copy the file to the new_project_path
        shutil.copy(source_config_file, new_project_path)
        logger.info(f"Config file has been copied to {new_project_path}")

        # loading config file
        config_file_path = os.path.join(new_project_path, "config.ini")
        config = Config(config_file_path)
        logger.info("Config file loaded")

        # Set values and save to file
        config.set_value("default_config", "project_code", project_code)
        config.set_value("default_config", "workdir", new_project_path)
        config.set_value("default_config", "fragments", fragments)
        config.set_value("docking", "target", fragments)

        # Save changes to the configuration file
        config.save()

        return (
            jsonify(
                {
                    "message": "Project created successfully",
                    "project_path": new_project_path,
                }
            ),
            201,
        )
    except Exception as e:
        logger.error(e)
        return jsonify({"error": str(e)}), 500


# Get config
@app.route("/secse/get_config", methods=["GET"])
def get_config():
    # Get directory path from request arguments
    directory = request.args.get("directory")

    config_file = os.path.join(directory, "config.ini")

    # Retrieve all options
    try:
        config = Config(config_file)
        app_config = {
            "default_config": config.get_all_options("default_config"),
            "docking": config.get_all_options("docking"),
            "prediction": config.get_all_options("prediction"),
            "molecular_properties": config.get_all_options("molecular_properties"),
        }
        app_config_camel = convert_dict_from_snake_to_camel_case(app_config)
        return jsonify(app_config_camel), 200

    except Exception as e:
        logger.error(e)
        return jsonify({"error": str(e)}), 500


# Save config
@app.route("/secse/save_config", methods=["POST"])
def save_config():
    # Get directory path from request arguments
    directory = request.json.get("directory")
    # Get config from request arguments
    configDict = request.json.get("config")

    configDict = convert_dict_from_camel_to_snake_case(configDict)

    config_file = os.path.join(directory, "config.ini")
    try:
        config = Config(config_file)
        config.set_all_options("default_config", configDict["default_config"])
        config.set_all_options("docking", configDict["docking"])
        config.set_all_options("prediction", configDict["prediction"])
        config.set_all_options(
            "molecular_properties", configDict["molecular_properties"]
        )
        config.save()
        return (
            jsonify({"message": "Paramters Saved successfully"}),
            200,
        )

    except Exception as e:
        logger.error(e)
        return jsonify({"error": str(e)}), 500


# Get default directory
@app.route("/secse/get_default_directory", methods=["GET"])
def get_default_directory():
    home_dir = os.path.expanduser("~/Projects/test/")
    return jsonify(home_dir), 200


if __name__ == "__main__":
    # logger configuration
    logger.configure(
        handlers=[
            {
                "sink": "logs/app_{time:YYYYMMDD}.log",
                "rotation": "00:00",
                "encoding": "utf-8",
                "format": LOGURU_FORMAT,
                "level": "INFO",
            }
        ],
    )

    app.run(debug=True)
