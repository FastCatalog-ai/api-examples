import requests, os
import json

UUID = "33f6a9f7-195e-4d51-9a63-134304756255" # Retrieved using the https://api.fastcatalog.ai/v1/catalog-entries endpoint
API_URL = f"https://api.fastcatalog.ai/v1/catalog-entries/{UUID}/spreadsheet"
TOKEN = os.getenv("FASTCATALOG_TOKEN", "YOUR_BEARER_TOKEN")   # Replace with your token

TARGET_DIR = "output" # Directory to save the spreadsheet
if not os.path.exists(TARGET_DIR):
    os.makedirs(TARGET_DIR, exist_ok=True)

payload = {
    "fcai_uuids": [UUID],
    "filename": "catalog_items.xlsx",
    "include_lineage": True,
    "depth": 3
}

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

with requests.post(API_URL, json=payload, headers=headers, stream=True) as r:
    r.raise_for_status()
    content_disposition = r.headers.get('content-disposition', '')
    if 'filename=' in content_disposition:
        filename = content_disposition.split('filename=')[1].strip(' "')
    else:
        filename = 'catalog_items.xlsx'
    filepath = os.path.join(TARGET_DIR, filename)
    with open(filepath, 'wb') as f:
        for chunk in r.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)
    print(f"Saved: {filepath}")