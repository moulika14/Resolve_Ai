def make_decision(investigation):
    order = investigation["order"]
    policy = investigation["policy"]

    if not order:
        return {
            "decision": "escalate",
            "reason": "Order information could not be found.",
            "action": "human_review"
        }

    if not policy:
        return {
            "decision": "escalate",
            "reason": "Relevant company policy could not be found.",
            "action": "human_review"
        }

    # Check the policy conditions
    is_express = order["shipping_type"].lower() == "express"
    is_delayed = order["delivery_days_delayed"] >= 2
    is_paid = order["payment_status"].lower() == "paid"

    if is_express and is_delayed and is_paid:
        return {
            "decision": "refund",
            "reason": "The order uses Express delivery, is delayed by 2 or more days, and has been paid for.",
            "action": "refund_shipping_fee"
        }

    return {
        "decision": "escalate",
        "reason": "The order does not clearly satisfy the automatic refund conditions.",
        "action": "human_review"
    }