from flask import Flask, jsonify, request
import os
from datetime import datetime

app = Flask(__name__)

# Root route with /secse in the path
@app.route('/secse', methods=['GET'])
def index():
    return "Welcome to the SECSE API!", 200

# Route to list all files and folders in a directory
@app.route('/secse/list_directory', methods=['GET'])
def list_directory():
    # Get directory path from request arguments
    directory = request.args.get('directory')

    # Get directory if it is a file
    if(os.path.isfile(directory)):
        index=directory.rfind("/")
        directory=directory[:index]

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
            itemsInfo.append({
                "name": item,
                "type": "folder",
                "lastModified": lastModifiedTimeReadable,
                "size": "-"  # Size is not applicable for directories
            })
        elif os.path.isfile(itemPath):
            itemsInfo.append({
                "name": item,
                "type": "file",
                "lastModified": lastModifiedTimeReadable,
                "size": os.path.getsize(itemPath)  # Get size for files
            })

    return jsonify(itemsInfo), 200

# Route to create a new folder
@app.route('/secse/create_folder', methods=['POST'])
def create_folder():
    # Get directory and folder name from request data
    directory = request.json.get('directory')
    folder_name = request.json.get('folder_name')

    # Validate that directory and folder_name are provided
    if not directory or not folder_name:
        return jsonify({"error": "Directory and folder name must be provided"}), 400

    # Get directory if it is a file
    if(os.path.isfile(directory)):
        index=directory.rfind("/")
        directory=directory[:index]

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
        return jsonify({"message": "Folder created successfully", "folder": folder_name}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
