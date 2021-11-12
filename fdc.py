"""
Handles requests to and responses from
the USDA FoodData Central (FDC) API.
"""

import json
import requests
from requests.exceptions import RequestException

# the "dataType" parameter is intentionally excluded from the list and search
# functions as a design decision; the "Branded" will be
# the only acceptable data type, and will always be used as a filter.
# The "brandOwner" parameter is also excluded from search, as it doesn't seem like
# a feature we'll need. This can be easily added if necessary.
_DATA_TYPES = ["Branded"]
_FDC_URL = "https://api.nal.usda.gov/fdc/v1"  # base url of the FDC API
_SECRETS = {"FDC_KEY": None}  # using a dict rather than a global variable
_SORT_VALUES = {
    "dataType": "dataType.keyword",
    "description": "lowercaseDescription.keyword",
}


class FDCResponseList(list):
    """Wrapper type for adding the success field to response lists."""

    def __getitem__(self, key):
        """
        Overrides the behavior for the square bracket operator on FDC response lists.
        This enables checking for success via `response["success"]` on all response objects.
        """
        if key == "success":
            return True

        return list.__getitem__(self, key)

    def __contains__(self, item):
        """
        Overrides the behavior for the `in` operator on FDC response lists.
        This enables the `"success" in response` check to be valid on all response objects.
        """
        if item == "success":
            return True

        return list.__contains__(self, item)


def _response(raw):
    # returning an error object matching the API error style for request exceptions
    if isinstance(raw, RequestException):
        return {
            "success": False,
            "error": {"code": "REQUEST_EXCEPTION", "message": str(raw)},
        }

    # ensuring the "success" field is always present
    if isinstance(raw, list):
        return FDCResponseList(raw)

    raw["success"] = "error" not in raw
    return raw


def _get(endpoint, params=None):
    if _SECRETS["FDC_KEY"] is None:
        raise Exception("FDC key has not been set")

    url = f"{_FDC_URL}/{endpoint}"

    params = params or {}
    params["api_key"] = _SECRETS["FDC_KEY"]

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        return _response(response.json())
    except RequestException as exc:
        return _response(exc)


def _post(endpoint, data=None):
    if _SECRETS["FDC_KEY"] is None:
        raise Exception("FDC key has not been set")

    url = f"{_FDC_URL}/{endpoint}"
    params = {"api_key": _SECRETS["FDC_KEY"]}

    try:
        response = requests.post(
            url,
            params=params,
            data=json.dumps(data or {}),
            headers={"Content-Type": "application/json"},
        )
        response.raise_for_status()
        return _response(response.json())
    except RequestException as exc:
        return _response(exc)


def _assign_search_info(data, page, per_page, sort, sort_direction):
    # if sort is a key in _SORT_VALUES, get the value.
    # otherwise, use the supplied sort parameter as the value.
    sort = _SORT_VALUES.get(sort, sort)

    if page != 1:
        data["pageNumber"] = page

    if per_page != 50:
        data["pageSize"] = per_page

    if sort is not None:
        data["sortBy"] = sort

    if sort_direction is not None:
        data["sortOrder"] = sort_direction

    data["dataType"] = _DATA_TYPES


# ultimately, the functions below will probably return an
# object instead of dict so it's easier to work with the results.


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
        params["nutrients"] = ",".join(map(str, nutrient_numbers))

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

    data = {"fdcIds": fdc_ids}

    if nutrient_numbers is not None:
        data["nutrients"] = nutrient_numbers

    if abridged:
        data["format"] = "abridged"

    return _post("foods", data)


def list_foods(page=1, per_page=50, sort=None, sort_direction=None):
    """
    Retrieves a list of available foods.

    Args:
        - page: The page at which the list should start.
        - per_page: The number of results per page.
        - sort: The field to sort by; one of "dataType",
            "description", "fdcId", or "publishedDate".
        - sort_direction: The direction that the sort
            should be applied; "asc" or "desc".
    """

    data = {}
    _assign_search_info(data, page, per_page, sort, sort_direction)

    return _post("foods/list", data)


# NOTE: consideration for search operators needs to be implemented
# in either the frontend, the backend, or both. Otherwise, errors may
# occur for unmatched parentheses.
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

    data = {"query": query}
    _assign_search_info(data, page, per_page, sort, sort_direction)

    return _post("foods/search", data)


def set_key(key):
    """
    Sets the FoodData Central API key
    to be used during API requests.

    Args:
        - key: The FDC API key to use.
    """

    _SECRETS["FDC_KEY"] = key
