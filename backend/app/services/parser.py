import json


def parse_policy(contents: bytes):
    """
    Parse and validate an AWS S3 Bucket Policy.
    """

    policy = json.loads(contents)

    required_keys = ["Version", "Statement"]

    for key in required_keys:
        if key not in policy:
            raise ValueError(
                f"Missing required field: '{key}'"
            )

    if not isinstance(policy["Statement"], list):
        raise ValueError(
            "'Statement' must be a list."
        )

    return policy