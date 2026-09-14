import uuid
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from routes.customers import router as customers_router
from routes.orders import router as orders_router
from routes.tickets import router as tickets_router
from routes.policies import router as policies_router

from services.investigation import investigate
from services.ai_prompt import build_qwen_prompt
from services.qwen_client import ask_qwen
from services.decision_validator import validate_qwen_decision
from services.actions import execute_action, verify_action
from services.escalation import create_escalation_case
from services.customer_response import build_customer_response


class SupportRequest(BaseModel):
    customer_id: str
    order_id: str
    message: str


app = FastAPI(title="ResolveAI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    customers_router,
    prefix="/api"
)

app.include_router(
    orders_router,
    prefix="/api"
)

app.include_router(
    tickets_router,
    prefix="/api"
)

app.include_router(
    policies_router,
    prefix="/api"
)


@app.get("/")
def root():
    return {
        "message": "ResolveAI backend is running"
    }


@app.post("/api/support")
def handle_support(request: SupportRequest):

    # Generate a unique case ID for every support request
    case_id = f"CASE-{uuid.uuid4().hex[:8].upper()}"

    # Step 1: Investigate the customer's case
    investigation = investigate(
        request.customer_id,
        request.order_id
    )

    # Step 2: Build the Qwen reasoning prompt
    qwen_prompt = build_qwen_prompt(
        request.message,
        investigation
    )

    # Step 3: Ask Qwen to reason about the case
    qwen_result = ask_qwen(qwen_prompt)

    # Step 4: If Qwen is unavailable, escalate
    if qwen_result.get("status") != "success":

        decision = {
            "decision": "escalate",
            "reason": "AI reasoning was unavailable.",
            "action": "human_review",
            "evidence": [],
            "intent": ""
        }

        escalation_case = create_escalation_case(
            customer_message=request.message,
            investigation=investigation,
            qwen_response={},
            reason="AI reasoning was unavailable."
        )

        customer_response = build_customer_response(
            decision,
            investigation
        )

        return {
            "case_id": case_id,
            "customer_message": request.message,
            "investigation": investigation,
            "decision": decision,
            "action_status": "not_required",
            "verification_status": "not_required",
            "resolution_status": customer_response["status"],
            "customer_response": customer_response,
            "escalation_case": escalation_case
        }

    # Step 5: Get Qwen's structured response
    qwen_response = qwen_result.get("response")

    # Step 6: Validate Qwen's decision
    validation = validate_qwen_decision(
        qwen_response
    )

    # Step 7: If Qwen gives an invalid response, escalate
    if not validation["valid"]:

        decision = {
            "decision": "escalate",
            "reason": validation["reason"],
            "action": "human_review",
            "evidence": (
                qwen_response.get("evidence", [])
                if isinstance(qwen_response, dict)
                else []
            ),
            "intent": (
                qwen_response.get("intent", "")
                if isinstance(qwen_response, dict)
                else ""
            )
        }

        escalation_case = create_escalation_case(
            customer_message=request.message,
            investigation=investigation,
            qwen_response=(
                qwen_response
                if isinstance(qwen_response, dict)
                else {}
            ),
            reason=validation["reason"]
        )

        customer_response = build_customer_response(
            decision,
            investigation
        )

        return {
            "case_id": case_id,
            "customer_message": request.message,
            "investigation": investigation,
            "qwen_response": qwen_response,
            "decision": decision,
            "action_status": "not_required",
            "verification_status": "not_required",
            "resolution_status": customer_response["status"],
            "customer_response": customer_response,
            "escalation_case": escalation_case
        }

    # Step 8: Build the validated decision
    decision = {
        "decision": validation["decision"],
        "reason": qwen_response.get(
            "reason",
            "No reason provided."
        ),
        "action": validation["action"],
        "evidence": qwen_response.get(
            "evidence",
            []
        ),
        "intent": qwen_response.get(
            "intent",
            ""
        )
    }

    # Step 9: Handle human escalation
    if validation["decision"] == "escalate":

        escalation_case = create_escalation_case(
            customer_message=request.message,
            investigation=investigation,
            qwen_response=qwen_response,
            reason=qwen_response.get(
                "reason",
                "Human review is required."
            )
        )

        customer_response = build_customer_response(
            decision,
            investigation
        )

        return {
            "case_id": case_id,
            "customer_message": request.message,
            "investigation": investigation,
            "qwen_response": qwen_response,
            "decision": decision,
            "action_status": "not_required",
            "verification_status": "not_required",
            "resolution_status": customer_response["status"],
            "customer_response": customer_response,
            "escalation_case": escalation_case
        }

    # Step 10: Execute an automatically approved action
    action_result = execute_action(
        validation["action"],
        investigation
    )

    # Step 11: Verify that the action actually happened
    verification = verify_action(
        validation["action"],
        investigation
    )

    # Step 12: Determine action status
    if action_result.get("status") == "completed":
        action_status = "completed"
    elif action_result.get("status") == "failed":
        action_status = "failed"
    else:
        action_status = "in_progress"

    # Step 13: Build customer-friendly response
    customer_response = build_customer_response(
        decision,
        investigation,
        action_result
    )

    # Step 14: Final response
    return {
        "case_id": case_id,
        "customer_message": request.message,
        "investigation": investigation,
        "qwen_response": qwen_response,
        "decision": decision,
        "action_result": action_result,
        "action_status": action_status,
        "verification_status": verification["verification_status"],
        "resolution_status": customer_response["status"],
        "customer_response": customer_response
    }


@app.post("/api/action/{action}")
def run_action(action: str, request: SupportRequest):

    investigation = investigate(
        request.customer_id,
        request.order_id
    )

    result = execute_action(
        action,
        investigation
    )

    return {
        "customer_message": request.message,
        "action_result": result
    }