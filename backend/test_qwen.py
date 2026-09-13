from services.qwen_client import ask_qwen
from services.ai_prompt import build_qwen_prompt
from services.investigation import investigate


customer_id = "CUST001"
order_id = "10482"

message = "My express order is 3 days late. I paid for express delivery and want a refund."

investigation = investigate(
    customer_id,
    order_id
)

prompt = build_qwen_prompt(
    message,
    investigation
)

result = ask_qwen(prompt)

print(result)