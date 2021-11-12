"""
Handles unmocked testing.
"""

import os
import unittest
from dotenv import load_dotenv
import fdc  # pylint: disable=import-error

load_dotenv()
fdc.set_key(os.getenv("FDC_KEY"))


class TestFdcAPI(unittest.TestCase):
    """Contains test cases for the FoodData Central API."""

    def setUp(self):
        self.fdc_id1 = 2057648  # cheddar cheese
        self.fdc_id2 = 534358  # nut n' berry mix

    def test_invalid_food(self):
        """Trying to retrieve an invalid food returns an error"""

        response = fdc.get_food_by_id(-1)

        self.assertIn("success", response)
        self.assertIn("error", response)
        self.assertIn("code", response["error"])
        self.assertIn("message", response["error"])

        self.assertEqual(response["success"], False)
        self.assertEqual(response["error"]["code"], "REQUEST_EXCEPTION")

    def test_retrieve_food(self):
        """Retrieving a food by FDC ID returns proper results"""

        response = fdc.get_food_by_id(self.fdc_id1)

        self.assertIn("success", response)
        self.assertIn("fdcId", response)
        self.assertIn("description", response)
        self.assertIn("ingredients", response)

        self.assertEqual(response["success"], True)
        self.assertEqual(response["fdcId"], self.fdc_id1)
        self.assertEqual(response["description"], "CHEDDAR CHEESE")

    def test_retrieve_food_with_nutrient_ids(self):
        """Retrieving a food with specific nutrient IDs returns only nutrients with those IDS."""

        response = fdc.get_food_by_id(self.fdc_id1, nutrient_numbers=[301])

        self.assertIn("success", response)
        self.assertEqual(response["success"], True)

        self.assertIn("foodNutrients", response)
        self.assertEqual(len(response["foodNutrients"]), 1)

        self.assertIn("nutrient", response["foodNutrients"][0])
        self.assertIn("number", response["foodNutrients"][0]["nutrient"])

        self.assertEqual(response["foodNutrients"][0]["nutrient"]["number"], "301")

    def test_retrieve_foods(self):
        """Retrieving multiple foods returns proper results"""

        ids = [self.fdc_id1, self.fdc_id2]
        response = fdc.get_foods(ids)

        self.assertIn("success", response)
        self.assertEqual(response["success"], True)

        self.assertEqual(len(response), 2)

        for idx, food in enumerate(response):
            self.assertIn("fdcId", food)
            self.assertIn("description", food)
            self.assertIn("ingredients", food)
            self.assertIn("foodNutrients", food)
            self.assertEqual(food["fdcId"], ids[idx])

    def test_list_foods(self):
        "Retrieving a list of foods returns results"

        response = fdc.list_foods(per_page=10)

        self.assertIn("success", response)
        self.assertEqual(response["success"], True)

        self.assertLessEqual(len(response), 10)

        for food in response:
            self.assertIn("fdcId", food)
            self.assertIn("description", food)
            self.assertIn("foodNutrients", food)

    def test_search_foods(self):
        "Searching for foods with a search query returns results"

        response = fdc.search("cheddar cheese", per_page=10)

        self.assertIn("success", response)
        self.assertEqual(response["success"], True)

        self.assertLessEqual(len(response), 10)
        self.assertIn("totalHits", response)
        self.assertIn("foods", response)

        self.assertGreaterEqual(response["totalHits"], 1)

        for food in response["foods"]:
            self.assertIn("fdcId", food)
            self.assertIn("description", food)
            self.assertIn("ingredients", food)
            self.assertIn("foodNutrients", food)
            self.assertEqual("cheese" in food["description"].lower(), True)
