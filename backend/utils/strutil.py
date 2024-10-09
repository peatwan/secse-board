def snake_to_camel(s):
    """Converts a snake_case string to camelCase."""
    words = s.split("_")
    return words[0] + "".join(word.title() for word in words[1:])


def convert_dict_to_camel_case(d):
    """Converts keys in a dictionary (and sub-dictionaries) from snake_case to camelCase."""
    new_dict = {}
    for k, v in d.items():
        if isinstance(v, dict):
            v = convert_dict_to_camel_case(v)
        new_dict[snake_to_camel(k)] = v
    return new_dict
