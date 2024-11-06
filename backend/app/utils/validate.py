import os
from flask import jsonify


def validate_path(path):
    if not path or not os.path.exists(path) or not os.path.isdir(path):
        return False, jsonify({"error": "Project path does not exist"}), 400
    return True, None, None
