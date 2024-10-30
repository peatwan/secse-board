import configparser
from configparser import NoSectionError, NoOptionError
from dataclasses import dataclass
from loguru import logger
from typing import Dict, Optional


class ConfigError(Exception):
    """Custom exception for configuration errors."""

    pass


@dataclass
class General:
    project_code: str
    workdir: str
    fragments: str
    num_gen: int
    num_per_gen: int
    seed_per_gen: int
    start_gen: int
    cpu: int
    gpu: int
    rule_db: str


@dataclass
class Docking:
    docking_program: str
    target: str
    RMSD: float
    delta_score: float
    score_cutoff: float
    x: Optional[float] = None
    y: Optional[float] = None
    z: Optional[float] = None
    box_size_x: Optional[float] = None
    box_size_y: Optional[float] = None
    box_size_z: Optional[float] = None


@dataclass
class Prediction:
    mode: int
    dl_per_gen: int
    dl_score_cutoff: float


@dataclass
class Properties:
    MW: float
    logP_lower: float
    logP_upper: float
    chiral_center: int
    heteroatom_ratio: float
    rdkit_rotatable_bound_num: int
    keen_rotatable_bound_num: int
    rigid_body_num: int
    HBD: int
    HBA: int
    TPSA: float
    lipinski_violation: int
    QED: float
    max_ring_size: int
    max_ring_system_size: int
    ring_system_count: int
    bridged_site_count: int
    spiro_site_count: int
    fused_site_count: int
    rdkit_sa_score: int
    substructure_filter: int


# set attribute with type cast
def set_attribute(self, name: str, value):
    try:
        expected_type = type(getattr(self, name))
        setattr(self, name, expected_type(value))
    except Exception:
        logger.error(
            f"Invalid type for {name}. Expected {expected_type}, got {type(value)}"
        )
        raise TypeError(
            f"Invalid type for {name}. Expected {expected_type}, got {type(value)}"
        )


class Config:
    def __init__(self, config_file: str):
        self.config_file = config_file
        self.config_parser = configparser.ConfigParser()
        try:
            read_files = self.config_parser.read(config_file)
            if not read_files:
                raise ConfigError(
                    f"Configuration file '{config_file}' not found or is empty."
                )

            # general
            if self.config_parser.has_section("general"):
                self.general = General(
                    project_code=self.config_parser.get("general", "project_code"),
                    workdir=self.config_parser.get("general", "workdir"),
                    fragments=self.config_parser.get("general", "fragments"),
                    num_gen=self.config_parser.getint("general", "num_gen"),
                    num_per_gen=self.config_parser.getint("general", "num_per_gen"),
                    seed_per_gen=self.config_parser.getint("general", "seed_per_gen"),
                    start_gen=self.config_parser.getint("general", "start_gen"),
                    cpu=self.config_parser.getint("general", "cpu"),
                    gpu=self.config_parser.getint("general", "gpu"),
                    rule_db=self.config_parser.get("general", "rule_db"),
                )
            # docking
            if self.config_parser.has_section("docking"):
                docking = Docking(
                    docking_program=self.config_parser.get(
                        "docking", "docking_program"
                    ),
                    target=self.config_parser.get("docking", "target"),
                    RMSD=self.config_parser.getfloat("docking", "RMSD"),
                    delta_score=self.config_parser.getfloat("docking", "delta_score"),
                    score_cutoff=self.config_parser.getfloat("docking", "score_cutoff"),
                )
                if "vina" in docking.docking_program.lower():
                    docking.x = self.config_parser.getfloat("docking", "x")
                    docking.y = self.config_parser.getfloat("docking", "y")
                    docking.z = self.config_parser.getfloat("docking", "z")
                    docking.box_size_x = self.config_parser.getfloat(
                        "docking", "box_size_x"
                    )
                    docking.box_size_y = self.config_parser.getfloat(
                        "docking", "box_size_y"
                    )
                    docking.box_size_z = self.config_parser.getfloat(
                        "docking", "box_size_z"
                    )
                self.docking = docking
            else:
                self.docking = None

            # prediction
            if self.config_parser.has_section("prediction"):
                self.prediction = Prediction(
                    mode=self.config_parser.getint("prediction", "mode"),
                    dl_per_gen=self.config_parser.getint("prediction", "dl_per_gen"),
                    dl_score_cutoff=self.config_parser.getfloat(
                        "prediction", "dl_score_cutoff"
                    ),
                )
            else:
                self.prediction = None

            # properties
            if self.config_parser.has_section("properties"):
                self.properties = Properties(
                    MW=self.config_parser.getfloat("properties", "MW"),
                    logP_lower=self.config_parser.getfloat("properties", "logP_lower"),
                    logP_upper=self.config_parser.getfloat("properties", "logP_upper"),
                    chiral_center=self.config_parser.getint(
                        "properties", "chiral_center"
                    ),
                    heteroatom_ratio=self.config_parser.getfloat(
                        "properties", "heteroatom_ratio"
                    ),
                    rdkit_rotatable_bound_num=self.config_parser.getint(
                        "properties", "rdkit_rotatable_bound_num"
                    ),
                    keen_rotatable_bound_num=self.config_parser.getint(
                        "properties", "keen_rotatable_bound_num"
                    ),
                    rigid_body_num=self.config_parser.getint(
                        "properties", "rigid_body_num"
                    ),
                    HBD=self.config_parser.getint("properties", "HBD"),
                    HBA=self.config_parser.getint("properties", "HBA"),
                    TPSA=self.config_parser.getfloat("properties", "TPSA"),
                    lipinski_violation=self.config_parser.getint(
                        "properties", "lipinski_violation"
                    ),
                    QED=self.config_parser.getfloat("properties", "QED"),
                    max_ring_size=self.config_parser.getint(
                        "properties", "max_ring_size"
                    ),
                    max_ring_system_size=self.config_parser.getint(
                        "properties", "max_ring_system_size"
                    ),
                    ring_system_count=self.config_parser.getint(
                        "properties", "ring_system_count"
                    ),
                    bridged_site_count=self.config_parser.getint(
                        "properties", "bridged_site_count"
                    ),
                    spiro_site_count=self.config_parser.getint(
                        "properties", "spiro_site_count"
                    ),
                    fused_site_count=self.config_parser.getint(
                        "properties", "fused_site_count"
                    ),
                    rdkit_sa_score=self.config_parser.getint(
                        "properties", "rdkit_sa_score"
                    ),
                    substructure_filter=self.config_parser.getint(
                        "properties", "substructure_filter"
                    ),
                )
            else:
                self.properties = None

        except (NoSectionError, NoOptionError, ValueError, configparser.Error) as e:
            logger.error(f"Configuration parsing error: {e}")
            raise ConfigError(f"Failed to load configuration: {e}")

    # -------------------- Save Configuration to File --------------------
    def save(self):
        """
        Save the current configuration back to the original configuration file.
        """
        try:
            with open(self.config_file, "w") as configfile:
                self.config_parser.write(configfile)
            logger.info(f"Configuration successfully saved to {self.config_file}")
        except IOError as e:
            logger.error(f"Failed to write to configuration file: {e}")
            raise ConfigError(f"Failed to write to configuration file: {e}")

    # -------------------- Generic Get and Set Methods --------------------
    def get_value(self, section: str, option: str, cast_type: type = str):
        """
        Generic method to get a configuration value.

        Args:
            section (str): The section in the config file.
            option (str): The option within the section.
            cast_type (type): The type to cast the returned value to (e.g., int, float, bool).

        Returns:
            The value cast to the specified type.

        Raises:
            ConfigError: If the section or option does not exist or casting fails.
        """
        try:
            if cast_type == int:
                return self.config_parser.getint(section, option)
            elif cast_type == float:
                return self.config_parser.getfloat(section, option)
            elif cast_type == bool:
                return self.config_parser.getboolean(section, option)
            else:
                return self.config_parser.get(section, option)
        except (NoSectionError, NoOptionError, ValueError) as e:
            logger.error(f"Error getting '{option}' from section '{section}': {e}")
            raise ConfigError(f"Error getting '{option}' from section '{section}': {e}")

    def set_value(self, section: str, option: str, value):
        """
        Generic method to set a configuration value.

        Args:
            section (str): The section in the config file.
            option (str): The option within the section.
            value: The value to set.

        Raises:
            ConfigError: If setting the value fails.
        """
        try:
            if not self.config_parser.has_section(section):
                self.config_parser.add_section(section)
            self.config_parser.set(section, option, str(value))
            logger.info(f"Set '{option}' in section '{section}' to '{value}'")
        except Exception as e:
            logger.error(f"Error setting '{option}' in section '{section}': {e}")
            raise ConfigError(f"Error setting '{option}' in section '{section}': {e}")

    def get_all_options(self, section: str) -> dict:
        """
        Retrieve all options and their values from a specified section.

        Args:
            section (str): The section in the config file.

        Returns:
            dict: A dictionary containing all options and their values.

        Raises:
            ConfigError: If the section does not exist.
        """
        try:
            if not self.config_parser.has_section(section):
                logger.error(
                    f"Section '{section}' does not exist in the configuration."
                )
                raise ConfigError(f"Section '{section}' does not exist.")

            options = {
                option: self.config_parser.get(section, option)
                for option in self.config_parser.options(section)
            }
            logger.info(f"Retrieved options from section '{section}': {options}")
            return options

        except Exception as e:
            logger.error(f"Error retrieving options from section '{section}': {e}")
            raise ConfigError(f"Error retrieving options from section '{section}': {e}")

    def set_all_options(self, section: str, options: Dict[str, any]):
        """
        Set multiple options within a specified section.

        Args:
            section (str): The section in the config file.
            options (dict): A dictionary containing option names and their corresponding values.

        Raises:
            ConfigError: If there is an error setting the options.
        """
        try:
            if not self.config_parser.has_section(section):
                self.config_parser.add_section(section)
                logger.info(f"Added new section '{section}' to the configuration.")

            for option, value in options.items():
                self.config_parser.set(section, option, str(value))
                logger.info(f"Set '{option}' in section '{section}' to '{value}'")

                # Update corresponding dataclass if applicable
                if section == "general" and hasattr(self.general, option):
                    set_attribute(self.general, option, value)
                elif (
                    section == "docking"
                    and self.docking
                    and hasattr(self.docking, option)
                ):
                    set_attribute(self.docking, option, value)
                elif (
                    section == "prediction"
                    and self.prediction
                    and hasattr(self.prediction, option)
                ):
                    set_attribute(self.prediction, option, value)
                elif (
                    section == "properties"
                    and self.properties
                    and hasattr(self.properties, option)
                ):
                    set_attribute(self.properties, option, value)

        except Exception as e:
            logger.error(f"Error setting multiple options in section '{section}': {e}")
            raise ConfigError(
                f"Error setting multiple options in section '{section}': {e}"
            )
