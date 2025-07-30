import requests, os
import json

API_URL = "https://api.fastcatalog.ai/v1/catalog-entries"
TOKEN = os.getenv("FASTCATALOG_TOKEN", "YOUR_BEARER_TOKEN")   # Replace with your token

payload = {
    "homepages": ["https://huggingface.co/datasets/Salesforce/xlam-function-calling-60k"]
}

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

response = requests.post(API_URL, json=payload, headers=headers)
print(response.status_code, json.dumps(response.json(), indent=2))