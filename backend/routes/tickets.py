from fastapi import APIRouter
import json

router = APIRouter()


def load_tickets():
    with open("data/tickets.json", "r") as file:
        return json.load(file)


@router.get("/tickets/{customer_id}")
def get_customer_tickets(customer_id: str):
    tickets = load_tickets()

    customer_tickets = []

    for ticket in tickets:
        if ticket["customer_id"] == customer_id:
            customer_tickets.append(ticket)

    return {
        "customer_id": customer_id,
        "tickets": customer_tickets
    }