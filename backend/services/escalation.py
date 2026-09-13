def create_escalation_case(
    customer_message,
    investigation,
    qwen_response,
    reason
):
    customer = investigation.get("customer")
    order = investigation.get("order")

    return {
        "case_status": "escalated",
        "escalation_reason": reason,

        "customer": customer,

        "order": order,

        "customer_message": customer_message,

        "ai_analysis": {
            "intent": qwen_response.get("intent", ""),
            "decision": qwen_response.get("decision", ""),
            "reason": qwen_response.get("reason", ""),
            "evidence": qwen_response.get("evidence", [])
        },

        "human_agent_message": (
            "This case requires human review. "
            "The AI investigation and supporting evidence "
            "have been attached for the support agent."
        )
    }