from flask import Flask, jsonify, request
import os
from datetime import datetime
from loguru import logger
from loguru._defaults import LOGURU_FORMAT
import shutil
from utils.path import get_user_directory
from utils.strutil import (
    convert_dict_from_snake_to_camel_case,
    convert_dict_from_camel_to_snake_case,
)
from utils.config import Config, ConfigError

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
    project_code = request.json.get("projectName")

    # Validate args are provided
    if not workingDirectory or not project_code:
        return (
            jsonify({"error": "Working directory and project name must be provided"}),
            400,
        )

    # Validate directory or file exist
    if not os.path.exists(workingDirectory):
        return jsonify({"error": "Working directory does not exist"}), 400

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

        default_directory = get_user_directory()

        # Set values and save to file
        config.set_value("general", "project_code", project_code)
        config.set_value("general", "workdir", new_project_path)
        config.set_value("general", "fragments", default_directory)
        config.set_value("docking", "target", default_directory)

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
        # remove directory if fail to create
        shutil.rmtree(new_project_path)
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
            "general": config.get_all_options("general"),
            "docking": config.get_all_options("docking"),
            "prediction": config.get_all_options("prediction"),
            "properties": config.get_all_options("properties"),
        }
        app_config_camel = convert_dict_from_snake_to_camel_case(app_config)
        return jsonify(app_config_camel), 200
    except ConfigError as e:
        return jsonify({"error": "Parameters fail to get!"}), 400
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

    if not os.path.exists(configDict["general"]["fragments"]) or not os.path.isfile(
        configDict["general"]["fragments"]
    ):
        return jsonify({"error": "Fragments file does not exist"}), 400

    if not os.path.exists(configDict["docking"]["target"]) or not os.path.isfile(
        configDict["docking"]["target"]
    ):
        return jsonify({"error": "Target file does not exist"}), 400

    config_file = os.path.join(directory, "config.ini")
    try:
        config = Config(config_file)
        config.set_all_options("general", configDict["general"])
        config.set_all_options("docking", configDict["docking"])
        config.set_all_options("prediction", configDict["prediction"])
        config.set_all_options("properties", configDict["properties"])
        config.save()
        return (
            jsonify({"message": "Parameters saved successfully"}),
            200,
        )
    except ConfigError as e:
        return jsonify({"error": "Parameters fail to save!"}), 400
    except Exception as e:
        logger.error(e)
        return jsonify({"error": str(e)}), 500


# Get default directory
@app.route("/secse/get_default_directory", methods=["GET"])
def get_default_directory():
    return jsonify(get_user_directory()), 200


@app.route("/secse/get_smiles_from_file", methods=["GET"])
def get_smiles_from_file():
    smiles_file_path = request.args.get("smiles_file_path")
    # Validate if directory is provided and exists
    if not smiles_file_path or not os.path.isfile(smiles_file_path):
        return jsonify({"error": "Smiles file not provided or does not exist"}), 400

    molecules = []
    try:
        with open(smiles_file_path, "r") as file:
            for line in file:
                line = line.strip()
                if line:
                    parts = line.split()
                    molecule = {
                        "smiles": parts[0],  # The SMILES string of the molecule
                    }
                    if len(parts) > 1:
                        # Assuming the second part is the molecule's  ID
                        molecule["id"] = parts[1]
                    molecules.append(molecule)
        return jsonify(molecules), 200
    except Exception as e:
        logger.error(e)
        return jsonify({"error": str(e)}), 500


@app.route("/secse/update_smiles", methods=["POST"])
def update_smiles():
    # Get args from request data
    smiles_file_path = request.json.get("smiles_file_path")
    id = request.json.get("id")
    smiles = request.json.get("smiles")

    if not smiles_file_path:
        return jsonify({"error": "File path must be provided!"}), 400
    if not id:
        return jsonify({"error": "Molecule ID must be provided!"}), 400
    if not smiles:
        return jsonify({"error": "Molecule can not be empty!"}), 400

    molecules = []
    with open(smiles_file_path, "r") as file:
        for line in file:
            line = line.strip()
            if line:
                parts = line.split()
                molecule = {
                    "smiles": parts[0],  # SMILES string
                    "id": parts[1],  # Molecule ID
                }
                molecules.append(molecule)

    # Updates the SMILES string of a molecule by id.
    for molecule in molecules:
        if molecule["id"] == id:
            molecule["smiles"] = smiles
            # Saves the updated list of molecules back to the .smi file.
            with open(smiles_file_path, "w") as file:
                for molecule in molecules:
                    file.write(f"{molecule['smiles']} {molecule['id']}\n")

            logger.info(f"Updated {id} to new SMILES: {smiles}")
            return (
                jsonify({"message": f"Updated {id} successfully"}),
                200,
            )
    # if not found, insert as a new record
    molecules.append({"smiles": smiles, "id": id})
    with open(smiles_file_path, "w") as file:
        for molecule in molecules:
            file.write(f"{molecule['smiles']} {molecule['id']}\n")

    logger.info(f"New molecule(id: {id}, smiles: {smiles}) added successfully!")
    return jsonify({"message": f"New molecule {id} added successfully"}), 200


@app.route("/secse/delete_smiles", methods=["DELETE"])
def delete_smiles():
    # Get args from request data
    smiles_file_path = request.args.get("smiles_file_path")
    id = request.args.get("id")

    molecules = []
    with open(smiles_file_path, "r") as file:
        for line in file:
            line = line.strip()
            if line:
                parts = line.split()
                molecule = {
                    "smiles": parts[0],  # SMILES string
                    "id": parts[1],  # Molecule ID
                }
                molecules.append(molecule)

    # Delete molecule by id
    updated_molecules = [molecule for molecule in molecules if molecule["id"] != id]

    if len(updated_molecules) < len(molecules):
        # Saves the updated list of molecules back to the .smi file.
        with open(smiles_file_path, "w") as file:
            for molecule in updated_molecules:
                file.write(f"{molecule['smiles']} {molecule['id']}\n")
        logger.info(f"Delete {id} in {smiles_file_path}")
        return (
            jsonify({"message": f"Delete molecule {id} successfully"}),
            200,
        )
    else:
        logger.error(f"Molecule {id} not found")
        return jsonify({"error": "Molecule {id} not found"}), 400


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

    app.run()
