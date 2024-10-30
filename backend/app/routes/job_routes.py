from datetime import datetime
import os
from flask import Blueprint, jsonify, request
from loguru import logger

from app.utils.file import read_status, save_status
from app.utils.config import Config, ConfigError

bp = Blueprint("job_routes", __name__)


@bp.route("/secse/start", methods=["POST"])
def start():
    # Get args from request data
    path = request.json.get("path")
    if not path or not os.path.exists(path) or not os.path.isdir(path):
        return jsonify({"error": "Project path does not exist"}), 400

    statusData = read_status(path)
    if not statusData:
        return jsonify({"error": "Cannot get project status"}), 400
    if statusData["status"] != "Created":
        return jsonify({"error": "Only created project can be started"}), 400

    config_file = os.path.join(path, "config.ini")

    # Retrieve all options
    try:
        config = Config(config_file)
    except ConfigError as e:
        return jsonify({"error": "Fail to load config file!"}), 400
    except Exception as e:
        logger.error(e)
        return jsonify({"error": str(e)}), 500

    # todo start running script
    statusData["status"] = "Running"
    statusData["generation"]["total"] = config.general.num_gen
    currentTime = datetime.now().isoformat()
    statusData["start_time"] = currentTime
    statusData["update_time"] = currentTime
    save_status(path, statusData)
    logger.info(f"Start project {path} successfully")
    return jsonify({"message": "Start running successfully"}), 200


@bp.route("/secse/stop", methods=["POST"])
def stop():
    # Get args from request data
    path = request.json.get("path")
    if not path or not os.path.exists(path) or not os.path.isdir(path):
        return jsonify({"error": "Project path does not exist"}), 400

    statusData = read_status(path)
    if not statusData:
        return jsonify({"error": "Cannot get project status"}), 400
    if statusData["status"] != "Running":
        return jsonify({"error": "Only running project can be stopped"}), 400

    # todo stop job script
    statusData["status"] = "Stopped"
    statusData["update_time"] = datetime.now().isoformat()
    save_status(path, statusData)
    logger.info(f"Stop project {path} successfully")
    return jsonify({"message": "Stop successfully"}), 200


@bp.route("/secse/pause", methods=["POST"])
def pause():
    # Get args from request data
    path = request.json.get("path")
    if not path or not os.path.exists(path) or not os.path.isdir(path):
        return jsonify({"error": "Project path does not exist"}), 400

    statusData = read_status(path)
    if not statusData:
        return jsonify({"error": "Cannot get project status"}), 400
    if statusData["status"] != "Running":
        return jsonify({"error": "Only running project can be paused"}), 400

    # todo pause job script
    statusData["status"] = "Paused"
    statusData["update_time"] = datetime.now().isoformat()
    save_status(path, statusData)
    logger.info(f"Pause project {path} successfully")
    return jsonify({"message": "Pause successfully"}), 200


@bp.route("/secse/resume", methods=["POST"])
def resume():
    # Get args from request data
    path = request.json.get("path")
    if not path or not os.path.exists(path) or not os.path.isdir(path):
        return jsonify({"error": "Project path does not exist"}), 400

    statusData = read_status(path)
    if not statusData:
        return jsonify({"error": "Cannot get project status"}), 400
    if statusData["status"] != "Paused":
        return jsonify({"error": "Only paused project can be started"}), 400

    # todo resume job script
    statusData["status"] = "Running"
    statusData["update_time"] = datetime.now().isoformat()
    save_status(path, statusData)
    logger.info(f"Resume project {path} successfully")
    return jsonify({"message": "Resume successfully"}), 200
