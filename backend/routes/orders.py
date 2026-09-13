from fastapi import APIRouter, HTTPException
import json

router = APIRouter()


def load_orders():
    with open("data/orders.json", "r") as file:
        return json.load(file)


@router.get("/orders/{order_id}")
def get_order(order_id: str):
    orders = load_orders()

    for order in orders:
        if order["order_id"] == order_id:
            return order

    raise HTTPException(status_code=404, detail="Order not found")