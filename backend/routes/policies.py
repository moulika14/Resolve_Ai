from fastapi import APIRouter
import json

router = APIRouter()


def load_policies():
    with open("data/policies.json", "r") as file:
        return json.load(file)


@router.get("/policies/{policy_type}")
def get_policy(policy_type: str):
    policies = load_policies()

    for policy in policies:
        if policy["policy_type"] == policy_type:
            return policy

    return {
        "policy_type": policy_type,
        "message": "Policy not found"
    }