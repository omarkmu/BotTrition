"""
Handles mocked testing.
"""

import os
import unittest
from unittest.mock import patch
from dotenv import load_dotenv

load_dotenv()


def _mocked_get(endpoint, params=None):
    """Handles mocked GET requests to the FDC API."""
    print("GET", endpoint, params)


def _mocked_post(endpoint, data=None):
    """Handles mocked POST requests to the FDC API."""
    print("POST", endpoint, data)


class TestMockedFdcAPI(unittest.TestCase):
    """Contains test cases for the FDC API request logic."""

    def setUp(self):
        fdc.set_key(os.getenv("FDC_KEY"))

        # patch the get and post request methods of the fdc module
        get_patcher = patch("fdc._get", side_effect=_mocked_get)
        post_patcher = patch("fdc._post", side_effect=_mocked_post)

        # ensure that the patchers are disabled after the test run
        self.addCleanup(get_patcher.stop)
        self.addCleanup(post_patcher.stop)

        # apply the patchers
        get_patcher.start()
        post_patcher.start()

    def test_placeholder(self):
        """Placeholder test passes"""
        fdc.get_food_by_id(0)
        fdc.list_foods(per_page=10)
        self.assertEqual(True, True)


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
