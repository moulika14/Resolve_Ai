from fastapi import APIRouter, HTTPException
import json

router = APIRouter()


def load_customers():
    with open("data/customers.json", "r") as file:
        return json.load(file)


@router.get("/customers/{customer_id}")
def get_customer(customer_id: str):
    customers = load_customers()

    for customer in customers:
        if customer["customer_id"] == customer_id:
            return customer

    raise HTTPException(status_code=404, detail="Customer not found")