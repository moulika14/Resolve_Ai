import json


def load_orders():
    with open("data/orders.json", "r") as file:
        return json.load(file)


def save_orders(orders):
    with open("data/orders.json", "w") as file:
        json.dump(orders, file, indent=2)


def execute_action(action, investigation):

    order = investigation.get("order")

    if action == "refund_shipping_fee":

        if not order:
            return {
                "status": "failed",
                "action": action,
                "message": "Order information is missing."
            }

        orders = load_orders()

        for stored_order in orders:
            if stored_order["order_id"] == order["order_id"]:

                stored_order["refund_status"] = "initiated"

                save_orders(orders)

                return {
                    "status": "completed",
                    "action": action,
                    "order_id": order["order_id"],
                    "refund_status": "initiated",
                    "message": "Shipping fee refund has been initiated."
                }

        return {
            "status": "failed",
            "action": action,
            "message": "Order could not be found."
        }

    if action == "no_action":
        return {
            "status": "completed",
            "action": action,
            "message": "No action is required."
        }

    if action == "human_review":
        return {
            "status": "escalated",
            "action": action,
            "message": "The case has been escalated to a human support agent."
        }

    return {
        "status": "failed",
        "action": action,
        "message": "Unsupported action."
    }

def verify_action(action, investigation):
    order = investigation.get("order")

    if action == "refund_shipping_fee":

        if not order:
            return {
                "verification_status": "failed"
            }

        orders = load_orders()

        for stored_order in orders:
            if stored_order["order_id"] == order["order_id"]:

                if stored_order.get("refund_status") == "initiated":
                    return {
                        "verification_status": "verified"
                    }

                return {
                    "verification_status": "failed"
                }

        return {
            "verification_status": "failed"
        }

    if action == "human_review":
        return {
            "verification_status": "not_required"
        }

    if action == "no_action":
        return {
            "verification_status": "not_required"
        }

    return {
        "verification_status": "failed"
    }