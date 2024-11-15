from flask import Blueprint, jsonify, request
import os
from datetime import datetime

from loguru import logger

from app.utils.file import get_user_directory

bp = Blueprint("file_routes", __name__)


@bp.route("/secse/list_directory", methods=["GET"])
def list_directory():
    # Get directory path from request arguments
    directory = request.args.get("directory")

    # Get directory if it is a file
    if os.path.isfile(directory):
        directory = os.path.dirname(directory)

    # Validate if directory is provided and exists
    if not directory or not os.path.exists(directory):
        return jsonify({"error": "Directory not provided or does not exist"}), 400

    # Prepare the response
    itemsInfo = []

    # Get list of items in the provided directory
    for item in os.listdir(directory):
        if not item.startswith("."):  # ignore hidden files
            itemPath = os.path.join(directory, item)
            # Get last modified time
            lastModifiedTime = os.path.getmtime(itemPath)
            lastModifiedTimeReadable = datetime.fromtimestamp(
                lastModifiedTime
            ).isoformat()

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
@bp.route("/secse/create_folder", methods=["POST"])
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


# Get default directory
@bp.route("/secse/get_default_directory", methods=["GET"])
def get_default_directory():
    return jsonify(get_user_directory()), 200
