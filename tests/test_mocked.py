"""
Handles mocked testing.
"""

import os
import unittest
from unittest import mock

MOCKED_DATA = [
    {
        "fdcId": 1111,
        "description": "MOCK FOOD",
        "dataType": "Branded",
    },
    {
        "fdcId": 1112,
        "description": "IGNORED FOOD",
        "dataType": "Foundation",
    },
]


def _mocked_get(endpoint, params):
    """
    Handles mocked GET requests to the FDC API by returning the provided parameters.
    """

    if not endpoint.startswith("food/"):
        # should be unreachable
        raise Exception("Invalid endpoint supplied to _get")

    fdc_id = endpoint[5:]

    for food in MOCKED_DATA:  # mocking the API by searching for a matching food
        if food["fdcId"] != fdc_id:
            continue

        copy = food.copy()
        copy["success"] = True

        return {"response": copy, "endpoint": endpoint, "params": params}

    return {
        "response": {"success": False},
        "endpoint": endpoint,
        "params": params,
    }


def _mocked_post(endpoint, data):
    """
    Handles mocked POST requests to the FDC API by returning the provided parameters.
    """

    type_filter = data["dataType"] if data and "dataType" in data else None

    if endpoint == "foods":
        foods = list(filter(lambda x: x["fdcId"] in data["fdcIds"], MOCKED_DATA))
        return {
            "response": fdc.FDCResponseList(foods),
            "endpoint": endpoint,
            "data": data,
        }

    if endpoint == "foods/list":
        foods = MOCKED_DATA
        if type_filter:
            foods = list(filter(lambda x: x["dataType"] in type_filter, foods))

        return {
            "response": fdc.FDCResponseList(foods),
            "endpoint": endpoint,
            "data": data,
        }

    if endpoint == "foods/search":
        upper = data["query"].upper()
        # I'm sure the actual search is more sophisticated, but this will do for testing
        foods = filter(lambda x: upper in x["description"], MOCKED_DATA)
        if type_filter:
            foods = filter(lambda x: x["dataType"] in type_filter, foods)

        return {
            "response": fdc.FDCResponseList(list(foods)),
            "endpoint": endpoint,
            "data": data,
        }

    # should be unreachable
    raise Exception("Invalid endpoint supplied to _post")


class TestMockedFdcAPI(unittest.TestCase):
    """Contains test cases for the FDC API request logic."""

    def setUp(self):
        # patch the get and post request methods of the fdc module
        get_patcher = mock.patch("fdc._get", side_effect=_mocked_get)
        post_patcher = mock.patch("fdc._post", side_effect=_mocked_post)

        # ensure that the patchers are disabled after the test run
        self.addCleanup(get_patcher.stop)
        self.addCleanup(post_patcher.stop)

        # apply the patchers
        get_patcher.start()
        post_patcher.start()

    def test_invalid_food_id(self):
        """Invalid food ID returns an object with success=False"""

        result = fdc.get_food_by_id(0)
        self.assertIn("response", result)
        self.assertIn("success", result["response"])
        self.assertIn("endpoint", result)
        self.assertIn("params", result)

        self.assertEqual(result["response"]["success"], False)
        self.assertEqual(result["endpoint"], "food/0")
        self.assertEqual(len(result["params"]), 0)

    def test_get_food_by_id_params(self):
        """Parameters to get_food_by_id are properly transformed"""

        result = fdc.get_food_by_id(1111, nutrient_numbers=[301, 401], abridged=True)

        self.assertIn("params", result)
        self.assertIn("endpoint", result)

        self.assertIn("response", result)
        self.assertIn("success", result["response"])
        self.assertEqual(result["response"]["success"], False)

        self.assertIn("nutrients", result["params"])
        self.assertIn("format", result["params"])
        self.assertEqual(result["params"]["nutrients"], "301,401")
        self.assertEqual(result["params"]["format"], "abridged")

    def test_get_foods_params(self):
        """Parameters to get_foods are properly transformed"""

        result = fdc.get_foods([1111, 1112], nutrient_numbers=[301], abridged=True)
        self.assertIn("endpoint", result)
        self.assertIn("data", result)

        self.assertIn("response", result)
        self.assertIn("success", result["response"])
        self.assertEqual(result["response"]["success"], True)
        self.assertEqual(len(result["response"]), 2)

        self.assertEqual(result["endpoint"], "foods")

        data = result["data"]

        self.assertIn("fdcIds", data)
        self.assertIn("nutrients", data)
        self.assertIn("format", data)

        self.assertEqual(data["format"], "abridged")
        self.assertSequenceEqual(data["fdcIds"], [1111, 1112])
        self.assertSequenceEqual(data["nutrients"], [301])

    def test_list_foods_params(self):
        """Parameters to list_foods are properly transformed"""

        result = fdc.list_foods(
            page=2, per_page=15, sort="dataType", sort_direction="asc"
        )

        self.assertIn("endpoint", result)
        self.assertIn("data", result)

        self.assertIn("response", result)
        self.assertIn("success", result["response"])
        self.assertEqual(result["response"]["success"], True)
        self.assertEqual(len(result["response"]), 1)

        self.assertEqual(result["endpoint"], "foods/list")

        data = result["data"]

        self.assertIn("pageNumber", data)
        self.assertIn("pageSize", data)
        self.assertIn("sortBy", data)
        self.assertIn("sortOrder", data)
        self.assertIn("dataType", data)

        self.assertEqual(data["pageNumber"], 2)
        self.assertEqual(data["pageSize"], 15)
        self.assertEqual(data["sortBy"], "dataType.keyword")
        self.assertEqual(data["sortOrder"], "asc")
        self.assertSequenceEqual(data["dataType"], ["Branded"])

    def test_search_params(self):
        """Parameters to search are properly transformed"""

        result = fdc.search(
            "mock food", page=10, per_page=20, sort="description", sort_direction="desc"
        )

        self.assertIn("endpoint", result)
        self.assertIn("data", result)

        self.assertIn("response", result)
        self.assertIn("success", result["response"])
        self.assertEqual(result["response"]["success"], True)
        self.assertEqual(len(result["response"]), 1)

        self.assertEqual(result["endpoint"], "foods/search")

        data = result["data"]

        self.assertIn("pageNumber", data)
        self.assertIn("pageSize", data)
        self.assertIn("sortBy", data)
        self.assertIn("sortOrder", data)
        self.assertIn("dataType", data)

        self.assertEqual(data["pageNumber"], 10)
        self.assertEqual(data["pageSize"], 20)
        self.assertEqual(data["sortBy"], "lowercaseDescription.keyword")
        self.assertEqual(data["sortOrder"], "desc")
        self.assertSequenceEqual(data["dataType"], ["Branded"])

    def test_search_only_branded(self):
        """The implicit dataType filter ignores non-Branded foods"""

        result = fdc.search("ignored food")

        self.assertIn("endpoint", result)
        self.assertIn("data", result)
        self.assertIn("response", result)

        self.assertIn("dataType", result["data"])
        self.assertSequenceEqual(result["data"]["dataType"], ["Branded"])

        self.assertEqual(result["endpoint"], "foods/search")
        self.assertEqual(len(result["response"]), 0)


# ensures that the file can be run both directly and via unittest
if __name__ == "__main__":
    import sys
    import inspect

    file_path = os.path.abspath(inspect.getfile(inspect.currentframe()))
    current_dir = os.path.dirname(file_path)
    sys.path.insert(0, os.path.dirname(current_dir))

    import fdc  # pylint: disable=import-error

    unittest.main()
else:
    import fdc  # pylint: disable=import-error
