import requests, os
import json

UUID = "e6bf1ff1-fba7-4fe4-bd82-6e79a3d745ba"
API_URL = f"https://api.fastcatalog.ai/v1/catalog-entries/{UUID}/lineage"
TOKEN = os.getenv("FASTCATALOG_TOKEN", "YOUR_BEARER_TOKEN")   # Replace with your token

payload = {
    "fcai_uuid": [UUID],
    "max_depth": 3  # or as needed, up to 10
}

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

response = requests.post(API_URL, json=payload, headers=headers)
print(response.status_code, json.dumps(response.json(), indent=2))
