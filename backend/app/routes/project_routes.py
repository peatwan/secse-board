import re
import shutil
from flask import Blueprint, jsonify, request
import os
from datetime import datetime

from loguru import logger
import pandas as pd

from app.utils.config import Config, ConfigError
from app.utils.strutil import (
    convert_dict_from_camel_to_snake_case,
    convert_dict_from_snake_to_camel_case,
)
from app.utils.file import get_user_directory, read_status, save_status

bp = Blueprint("project_routes", __name__)


# Create a new project
@bp.route("/secse/create_project", methods=["POST"])
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

        # Write project status file
        statusData = {
            "status": "Created",
            "project_code": project_code,
            "start_time": "",
            "update_time": datetime.now().isoformat(),
            "generation": {"current": 0, "total": 0},
        }
        save_status(new_project_path, statusData)

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
@bp.route("/secse/get_config", methods=["GET"])
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
@bp.route("/secse/save_config", methods=["POST"])
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


@bp.route("/secse/get_smiles_from_file", methods=["GET"])
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


@bp.route("/secse/update_smiles", methods=["POST"])
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


@bp.route("/secse/delete_smiles", methods=["DELETE"])
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


# Get project status
@bp.route("/secse/get_project_status", methods=["GET"])
def get_project_status():
    # Get args from request data
    path = request.args.get("path")
    if not path or not os.path.exists(path) or not os.path.isdir(path):
        return jsonify({"error": "Project path does not exist"}), 400

    status = read_status(path)
    if not status:
        return jsonify({"error": "Cannot get project status"}), 400
    return jsonify(status), 200


@bp.route("/secse/get_scores", methods=["GET"])
def get_scores():
    # Get args from request data
    path = request.args.get("path")
    if not path or not os.path.exists(path) or not os.path.isdir(path):
        return jsonify({"error": "Project path does not exist"}), 400

    status = read_status(path)
    currentGeneration = status["generation"]["current"]
    result = {"dockingScore": [], "scoreCutoff": []}
    # iterate over generations
    for i in range(1, currentGeneration + 1):
        # read docking score from docked_gen_[n].csv file
        docked_file = os.path.join(
            path, "generation_" + str(i), "docked_gen_" + str(i) + ".csv"
        )
        df = pd.read_csv(docked_file)
        result["dockingScore"].append(df["docking score"].astype(float).quantile(0.01))

    # read score cutoff from log file
    log_file = os.path.join(path, "nohup.out")
    cutoff_scores = []
    with open(log_file, "r") as file:
        for line in file:
            match = re.search(r"The evaluate score cutoff is: (-?\d+\.\d+)", line)
            if match:
                score = float(match.group(1))
                cutoff_scores.append(score)

    # only include generation 1 to current generation
    for i in range(1, currentGeneration + 1):
        result["scoreCutoff"].append(cutoff_scores[i])

    return jsonify(result), 200


@bp.route("/secse/get_seeds_number", methods=["GET"])
def get_seeds_number():
    # Get args from request data
    path = request.args.get("path")
    status = read_status(path)
    currentGeneration = status["generation"]["current"]
    result = []
    if not path or not os.path.exists(path) or not os.path.isdir(path):
        return jsonify({"error": "Project path does not exist"}), 400
    for i in range(1, currentGeneration + 1):
        seed_fragments_file = os.path.join(
            path, "generation_" + str(i), "seed_fragments.smi"
        )
        with open(seed_fragments_file, "r") as file:
            num_lines = sum(1 for _ in file)
            result.append(num_lines - 1)  # not count header line
    return jsonify(result), 200


@bp.route("/secse/get_molecule_number", methods=["GET"])
def get_molecule_number():
    # Get args from request data
    path = request.args.get("path")
    status = read_status(path)
    currentGeneration = status["generation"]["current"]
    result = {"generated": [], "filtered": []}
    if not path or not os.path.exists(path) or not os.path.isdir(path):
        return jsonify({"error": "Project path does not exist"}), 400
    for i in range(1, currentGeneration + 1):
        filter_file = os.path.join(path, "generation_" + str(i), "filter.csv")
        with open(filter_file, "r") as file:
            num_lines = sum(1 for _ in file)
            result["filtered"].append(num_lines - 1)  # not count header line
        generation_file = os.path.join(path, "generation_" + str(i), "generation.csv")
        with open(generation_file, "r") as file:
            num_lines = sum(1 for _ in file)
            result["generated"].append(num_lines)
    return jsonify(result), 200
