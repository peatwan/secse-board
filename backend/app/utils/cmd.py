import subprocess
from loguru import logger


def shell_cmd_execute(cmd_lst):
    cmd = " ".join(cmd_lst)
    logger.debug(f"Executing command: {cmd}")
    try:
        result = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            shell=True,
            check=True,
        )
        if len(result.stdout) > 0:
            logger.info("Command output:\n" + result.stdout)
        logger.info(f"Success: {result.stdout}")
        return result.stdout
    except subprocess.CalledProcessError as e:
        logger.error(f"Command failed with return code {e.returncode}")
        logger.error(f"Command output: {e.stderr}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise
