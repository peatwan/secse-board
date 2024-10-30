from flask import Flask
from app.logging_config import configure_logging
from app.routes import main_bp, file_routes_bp, project_routes_bp, job_routes_bp


def create_app():
    app = Flask(__name__)

    # Configure logging
    configure_logging(app)

    # Register blueprints
    app.register_blueprint(main_bp)
    app.register_blueprint(file_routes_bp)
    app.register_blueprint(project_routes_bp)
    app.register_blueprint(job_routes_bp)

    return app
