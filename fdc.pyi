from typing import List, Literal

def get_food_by_id(
    fdc_id: int, nutrient_numbers: List[int] = None, abridged: bool = False
) -> dict: ...
def get_foods(
    fdc_ids: List[int], nutrient_numbers: List[int] = None, abridged: bool = False
) -> dict: ...
def list_foods(
    page: int = 1,
    per_page: int = 50,
    sort: Literal["dataType", "description", "fdcId", "publishedDate"] = None,
    sort_direction: Literal["asc", "desc"] = None,
) -> list: ...
def search(
    query: str,
    page: int = 1,
    per_page: int = 50,
    sort: Literal["dataType", "description", "fdcId", "publishedDate"] = None,
    sort_direction: Literal["asc", "desc"] = None,
) -> list: ...
def set_key(key: str | None) -> None: ...
