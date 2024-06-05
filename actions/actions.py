from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import logging

logger = logging.getLogger(__name__)

class ActionGetProductInfo(Action):

    def name(self) -> Text:
        return "action_get_product_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        product_name = tracker.get_slot('product_name')
        logger.debug(f"SLOTS:{tracker.slots}")
        logger.debug(f"Received product_name slot: {product_name}")

        if product_name is None:
            dispatcher.utter_message(text="Sorry, I didn't catch the product name.")
            return []

        products = [
            {"id": 1, "title": "Haljina", "description": "Duga haljina sa cvetnim dezenom.", "price": 3.99},
            {"id": 2, "title": "Majica", "description": "Kratka majica sa modernim printom.", "price": 2.49},
            {"id": 3, "title": "Pantalone", "description": "Elegantne pantalone za sve prilike.", "price": 4.99},
            {"id": 4, "title": "Suknja", "description": "Kratka suknja sa kariranim dezenom.", "price": 3.49},
            {"id": 5, "title": "Jakna", "description": "Topla jakna za zimu.", "price": 8.99},
            {"id": 6, "title": "Cipele", "description": "Kožne cipele za elegantne prilike.", "price": 7.99},
            {"id": 7, "title": "Sandale", "description": "Lagan sandale za leto.", "price": 2.99},
            {"id": 8, "title": "Kaput", "description": "Elegantan kaput za proleće.", "price": 9.99},
            {"id": 9, "title": "Šorts", "description": "Kratki šorts za sport.", "price": 3.29},
            {"id": 10, "title": "Haljina", "description": "Kratka haljina sa prugama.", "price": 4.19},
            {"id": 11, "title": "Pulover", "description": "Udoban pulover za jesen.", "price": 5.49}
        ]

        product_info = next((product for product in products if product['title'].lower() == product_name.lower()), None)

        if product_info:
            dispatcher.utter_message(
                text=f"Here are the details for {product_name}: ID - {product_info['id']}, Description - {product_info['description']}, Price - {product_info['price']}"
            )
        else:
            dispatcher.utter_message(text=f"Sorry, I couldn't find details for {product_name}.")

        return []
