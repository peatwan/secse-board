import re


def snake_to_camel(s):
    """Converts a snake_case string to camelCase."""
    words = s.split("_")
    return words[0] + "".join(word.title() for word in words[1:])


def convert_dict_from_snake_to_camel_case(d):
    """Converts keys in a dictionary (and sub-dictionaries) from snake_case to camelCase."""
    new_dict = {}
    for k, v in d.items():
        if isinstance(v, dict):
            v = convert_dict_from_snake_to_camel_case(v)
        new_dict[snake_to_camel(k)] = v
    return new_dict


def camel_to_snake(s):
    s1 = re.sub("([a-z0-9])([A-Z])", r"\1_\2", s)
    return s1.lower()


def convert_dict_from_camel_to_snake_case(d):
    new_dict = {}
    for k, v in d.items():
        if isinstance(v, dict):
            v = convert_dict_from_camel_to_snake_case(v)
        new_dict[camel_to_snake(k)] = v
    return new_dict
