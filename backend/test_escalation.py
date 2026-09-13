from services.escalation import create_escalation_case


investigation = {
    "customer": {
        "customer_id": "CUST002",
        "name": "Rahul Mehta"
    },
    "order": {
        "order_id": "10483",
        "status": "out_for_delivery"
    }
}

qwen_response = {
    "intent": "Customer wants delivery information",
    "decision": "escalate",
    "reason": "The case requires human review.",
    "evidence": [
        "Order is currently out for delivery"
    ]
}

result = create_escalation_case(
    customer_message="I need help with my order.",
    investigation=investigation,
    qwen_response=qwen_response,
    reason="AI could not safely resolve the case."
)

print(result)