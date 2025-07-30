import requests, os
import json

def make_summary_dict(data: dict) -> dict:
    entry = data.get("entry", {})
    summary_dict = {}

    summary_dict["name"] = entry.get("name", "")
    summary_dict["fcai_uuid"] = entry.get("fcai_uuid", "")
    summary_dict["provider"] = entry.get("data_provider", "")
    summary_dict["provider_type"] = entry.get("data_provider_type", "")
    summary_dict["provider_url"] = entry.get("provider_url", "")
    summary_dict["country_of_origin"] = entry.get("country_of_origin", "")
    summary_dict["modality"] = ", ".join(entry.get("modalities", [])) if entry.get("modalities") else entry.get("modality", "")
    summary_dict["availability"] = entry.get("data_availability", "")
    summary_dict["homepage"] = entry.get("homepage", "")
    summary_dict["download_method"] = entry.get("data_package_info", [{}])[0].get("download_method", "")
    summary_dict["synthetic"] = entry.get("components", [{}])[0].get("synthetic", "")
    summary_dict["terms_of_use"] = entry.get("terms_name", "")
    summary_dict["terms_url"] = entry.get("terms_url", "")
    summary_dict["citation"] = entry.get("citation", "")
    summary_dict["personal_data_type"] = entry.get("personal_data_type", "")
    summary_dict["personal_data_description"] = entry.get("personal_data_description", "")
    summary_dict["description"] = entry.get("description", "")
    summary_dict["research_paper_url"] = entry.get("research_paper_url", "")
    summary_dict["noted_biases"] = list(entry.get("noted_biases", {}).keys())[0] if entry.get("noted_biases") else ""
    summary_dict["data_download_urls"] = entry.get("data_download_urls", [])
    summary_dict["alternate_url"] = entry.get("alternate_url", "")
    summary_dict["signoff_by"] = entry.get("signoff_by", "")
    summary_dict["signoff_ts"] = entry.get("signoff_ts", "")

    return summary_dict


BASE_URL = "https://api.fastcatalog.ai/v1"

SEARCH_API_URL = f"{BASE_URL}/catalog-entries"
TOKEN = os.getenv("FASTCATALOG_TOKEN", "YOUR_BEARER_TOKEN")   # Replace with your token

payload = {
    "homepages": ["https://huggingface.co/datasets/Salesforce/xlam-function-calling-60k"]
}

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

limit = 3

response = requests.post(f"{SEARCH_API_URL}?limit={limit}", json=payload, headers=headers)
# print(response.status_code, json.dumps(response.json(), indent=2))

UUID = response.json()["entries"][0]['fcai_uuid']

RETRIEVE_API_URL = f"{BASE_URL}/catalog-entries/{UUID}"
response = requests.get(RETRIEVE_API_URL, headers=headers)

summary = make_summary_dict(response.json())

print(response.status_code, json.dumps(summary, indent=2))