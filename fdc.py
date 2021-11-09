"""
Handles requests to and responses from
the USDA FoodData Central (FDC) API.
"""

import requests

_FDC_URL = "https://api.nal.usda.gov/fdc/v1/"  # base url of the FDC API
_SECRETS = {"FDC_KEY": None}  # using a dict rather than a global variable


def _get(endpoint: str, params: dict = None):
    if _SECRETS["FDC_KEY"] is None:
        raise Exception("FDC key has not been set")

    url = f"{_FDC_URL}/{endpoint}"

    params = params or {}
    params["api_key"] = _SECRETS["FDC_KEY"]

    response = requests.get(url, params=params)
    json = response.json()

    # TODO: perform error checking here
    if not response.ok or "error" in json:
        pass

    return json


def _post(endpoint: str, data: dict = None):
    if _SECRETS["FDC_KEY"] is None:
        raise Exception("FDC key has not been set")

    url = f"{_FDC_URL}/{endpoint}"

    data = data or {}
    params = {"api_key": _SECRETS["FDC_KEY"]}

    response = requests.post(url, params=params, data=data)
    json = response.json()

    # TODO: perform error checking here too
    if not response.ok or "error" in json:
        pass

    return response


def set_key(key: str) -> None:
    """
    Sets the FoodData Central API key
    to be used during API requests.
    """

    _SECRETS["FDC_KEY"] = key
