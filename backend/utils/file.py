import os
import json
from datetime import datetime


def get_user_directory():
    return os.path.expanduser("~/Projects/test/")


# Save project status in a JSON file
def save_status(path, status, project_code=None):
    status_file = os.path.join(path, "project_status.json")
    data = {
        "status": status,
        "project_code": project_code,
        "timestamp": datetime.now().isoformat(),
    }
    with open(status_file, "w") as file:
        json.dump(data, file, indent=4)


# Read project status from a JSON file
def read_status(path):
    try:
        status_file = os.path.join(path, "project_status.json")
        with open(status_file, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return None
