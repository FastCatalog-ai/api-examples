import requests, os
import json

UUID = "33f6a9f7-195e-4d51-9a63-134304756255"
API_URL = f"https://api.fastcatalog.ai/v1/catalog-entries/{UUID}"
TOKEN = os.getenv("FASTCATALOG_TOKEN", "YOUR_BEARER_TOKEN")   # Replace with your token

headers = {
    "Authorization": f"Bearer {TOKEN}"
}

response = requests.get(API_URL, headers=headers)
print(response.status_code, json.dumps(response.json(), indent=2))