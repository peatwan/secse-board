from loguru import logger
import logging
from loguru._defaults import LOGURU_FORMAT


class InterceptHandler(logging.Handler):
    def emit(self, record):
        level = logger.level(record.levelname).name
        logger.opt(depth=2, exception=record.exc_info).log(level, record.getMessage())


def configure_logging(app):
    logger.configure(
        handlers=[
            {
                "sink": "logs/app_{time:YYYYMMDD}.log",
                "rotation": "00:00",
                "encoding": "utf-8",
                "format": LOGURU_FORMAT,
            }
        ]
    )
    app.logger.addHandler(InterceptHandler())
