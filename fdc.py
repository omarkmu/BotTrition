"""
Handles requests to and responses from
the USDA FoodData Central (FDC) API.
"""

import requests

_FDC_URL = "https://api.nal.usda.gov/fdc/v1"  # base url of the FDC API
_SECRETS = {"FDC_KEY": None}  # using a dict rather than a global variable


def _get(endpoint, params=None):
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


def _post(endpoint, data=None):
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


# setting up initial declarations without bodies
# while deciding how to structure responses.

# ultimately, these will probably return an
# object instead of dict so it's easier to work with the results


def get_food_by_id(fdc_id, nutrient_numbers=None, abridged=False):
    """
    Retrieves information about a food given its FDC ID.

    Args:
        - fdc_id: The FDC ID of the food to retrieve.
        - nutrient_numbers: An optional list of up to 25 nutrients to retrieve.
            If the food has no matches with the supplied nutrients,
            the "foodNutrients" field in the response will be empty.
        - abridged: Whether to return abridged results.
    """

    params = {}

    if nutrient_numbers is not None:
        params["nutrients"] = ",".join(nutrient_numbers)

    if abridged:
        params["format"] = "abridged"

    return _get(f"food/{fdc_id}", params)


def get_foods(fdc_ids, nutrient_numbers=None, abridged=False):
    """
    Retrieves information about multiple foods given their FDC IDs.

    Args:
        - fdc_ids: A list of FDC IDs for foods to retrieve.
        - nutrient_numbers: An optional list of up to 25 nutrients to retrieve.
            If a food has no matches with the supplied nutrients,
            the "foodNutrients" field will be empty.
        - abridged: Whether to return abridged results.
    """


# the "dataType" parameter is intentionally excluded from this function
# and from the search function as a design decision; the "Foundation" and "Branded"
# types are the only typed which include food nutrients, which
# are an essential part of our app, so those two types will be
# the only acceptable data types, and they will always be used as filters.


def list_foods(page=1, per_page=50, sort=None, sort_direction=None):
    """
    Retrieves a list of available foods.

    Args:
        - page: The page at which the list should start.
        - per_page: The number of results per page.
        - sort: The field to sort by;one of "dataType",
            "description", "fdcId", or "publishedDate".
        - sort_direction: The direction that the sort
            should be applied; "asc" or "desc".
    """


def search(query, page=1, per_page=50, sort=None, sort_direction=None):
    """
    Searches for foods based on a search query.

    Args:
        - query: The search query.
        - page: The page at which the search results should start.
        - per_page: The number of results per page.
        - sort: The field to sort by; one of "dataType",
            "description", "fdcId", or "publishedDate".
        - sort_direction: The direction that the sort
            should be applied; "asc" or "desc".
    """


def set_key(key):
    """
    Sets the FoodData Central API key
    to be used during API requests.

    Args:
        - key: The FDC API key to use.
    """

    _SECRETS["FDC_KEY"] = key
