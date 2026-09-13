ALLOWED_DECISIONS = {
    "approve",
    "deny",
    "escalate"
}

ALLOWED_ACTIONS = {
    "refund_shipping_fee",
    "human_review",
    "no_action"
}


def validate_qwen_decision(qwen_result):
    if not isinstance(qwen_result, dict):
        return {
            "valid": False,
            "reason": "Qwen response is not a valid JSON object.",
            "decision": "escalate",
            "action": "human_review"
        }

    decision = qwen_result.get("decision")
    action = qwen_result.get("action")

    if decision not in ALLOWED_DECISIONS:
        return {
            "valid": False,
            "reason": "Qwen returned an unsupported decision.",
            "decision": "escalate",
            "action": "human_review"
        }

    if action not in ALLOWED_ACTIONS:
        return {
            "valid": False,
            "reason": "Qwen returned an unsupported action.",
            "decision": "escalate",
            "action": "human_review"
        }

    if decision == "escalate" and action != "human_review":
        return {
            "valid": False,
            "reason": "Escalation must use the human_review action.",
            "decision": "escalate",
            "action": "human_review"
        }

    if decision == "approve" and action == "human_review":
        return {
            "valid": False,
            "reason": "An approved case cannot use human_review as its action.",
            "decision": "escalate",
            "action": "human_review"
        }

    return {
        "valid": True,
        "reason": "Qwen decision passed backend validation.",
        "decision": decision,
        "action": action
    }