def build_customer_response(decision, investigation, action_result=None):
    order = investigation.get("order")
    customer = investigation.get("customer")

    decision_type = decision.get("decision")
    action = decision.get("action")

    customer_name = customer.get("name", "Customer") if customer else "Customer"
    order_id = order.get("order_id", "") if order else ""

    # Automatic approval
    if decision_type == "approve":

        if action == "refund_shipping_fee":
            return {
                "status": "resolved",
                "message": (
                    f"Hi {customer_name}, your shipping fee refund for "
                    f"order #{order_id} has been initiated successfully."
                ),
                "details": (
                    "Your order qualified for the refund because it used "
                    "Express delivery and was delayed by 2 or more days."
                )
            }

        return {
            "status": "resolved",
            "message": (
                f"Hi {customer_name}, your request for order "
                f"#{order_id} has been successfully processed."
            ),
            "details": decision.get(
                "reason",
                "Your request was approved."
            )
        }

    # Human escalation
    if decision_type == "escalate":
        return {
            "status": "escalated",
            "message": (
                f"Hi {customer_name}, your request for order "
                f"#{order_id} has been forwarded to a human support agent."
            ),
            "details": (
                "We could not automatically resolve this request based "
                "on the available information and policy."
            )
        }

    # Denied request
    if decision_type == "deny":
        return {
            "status": "not_approved",
            "message": (
                f"Hi {customer_name}, we could not approve your request "
                f"for order #{order_id}."
            ),
            "details": decision.get(
                "reason",
                "The request does not meet the applicable policy conditions."
            )
        }

    # Safety fallback
    return {
        "status": "escalated",
        "message": (
            f"Hi {customer_name}, your request for order "
            f"#{order_id} has been forwarded to a human support agent."
        ),
        "details": "The request requires further review."
    }