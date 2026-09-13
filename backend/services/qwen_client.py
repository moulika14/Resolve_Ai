import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()


def ask_qwen(prompt):
    api_key = os.getenv("QWEN_API_KEY")
    base_url = os.getenv("QWEN_BASE_URL")
    model = os.getenv("QWEN_MODEL", "qwen/qwen3-30b-a3b-instruct-2507")

    if not api_key:
        return {
            "status": "not_configured",
            "message": "Qwen API key is not configured yet."
        }

    if not base_url:
        return {
            "status": "not_configured",
            "message": "Qwen API base URL is not configured yet."
        }

    try:
        client = OpenAI(
            api_key=api_key,
            base_url=base_url
        )

        response = client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        content = response.choices[0].message.content

        try:
            parsed_response = json.loads(content)

            return {
                "status": "success",
                "response": parsed_response
            }

        except json.JSONDecodeError:
            return {
                "status": "success",
                "response": content,
                "warning": "Qwen response was not valid JSON."
            }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }