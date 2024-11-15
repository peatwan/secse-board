import os
import json
from datetime import datetime


def get_user_directory():
    with open("backend_config.json") as f:
        d = json.load(f)
        return os.path.expanduser(d.get("default_user_directory", "~/"))


# Save project status in a JSON file
def save_status(path, data):
    status_file = os.path.join(path, "project_status.json")
    with open(status_file, "w") as file:
        json.dump(data, file, indent=2)


# Read project status from a JSON file
def read_status(path):
    try:
        status_file = os.path.join(path, "project_status.json")
        with open(status_file, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return None
