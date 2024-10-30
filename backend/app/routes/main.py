from flask import Blueprint, jsonify

bp = Blueprint("main", __name__)


@bp.route("/secse", methods=["GET"])
def index():
    return "Welcome to the SECSE API!", 200
