import json


def load_json(file_path):
    with open(file_path, "r") as file:
        return json.load(file)


def investigate(customer_id, order_id):
    customers = load_json("data/customers.json")
    orders = load_json("data/orders.json")
    tickets = load_json("data/tickets.json")
    policies = load_json("data/policies.json")

    # Find customer
    customer = next(
        (c for c in customers if c["customer_id"] == customer_id),
        None
    )

    # Find order
    order = next(
        (o for o in orders if o["order_id"] == order_id),
        None
    )

    # Find customer's ticket history
    customer_tickets = [
        ticket for ticket in tickets
        if ticket["customer_id"] == customer_id
    ]

    # Find relevant policy
    policy = next(
        (p for p in policies if p["policy_type"] == "delivery_refund"),
        None
    )

    return {
        "customer": customer,
        "order": order,
        "ticket_history": customer_tickets,
        "policy": policy
    }