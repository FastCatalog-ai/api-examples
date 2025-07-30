import axios from "axios";

function makeSummaryDict(data) {
  const entry = data.entry || {};
  const summaryDict = {};

  summaryDict["name"] = entry.name || "";
  summaryDict["fcai_uuid"] = entry.fcai_uuid || "";
  summaryDict["provider"] = entry.data_provider || "";
  summaryDict["provider_type"] = entry.data_provider_type || "";
  summaryDict["provider_url"] = entry.provider_url || "";
  summaryDict["country_of_origin"] = entry.country_of_origin || "";
  summaryDict["modality"] = Array.isArray(entry.modalities) ? entry.modalities.join(", ") : (entry.modality || "");
  summaryDict["availability"] = entry.data_availability || "";
  summaryDict["homepage"] = entry.homepage || "";

  summaryDict["download_method"] =
    entry.data_package_info && entry.data_package_info.length > 0
      ? entry.data_package_info[0].download_method || ""
      : "";

  summaryDict["synthetic"] =
    entry.components && entry.components.length > 0
      ? entry.components[0].synthetic || ""
      : "";

  summaryDict["terms_of_use"] = entry.terms_name || "";
  summaryDict["terms_url"] = entry.terms_url || "";
  summaryDict["citation"] = entry.citation || "";
  summaryDict["personal_data_type"] = entry.personal_data_type || "";
  summaryDict["personal_data_description"] = entry.personal_data_description || "";
  summaryDict["description"] = entry.description || "";
  summaryDict["research_paper_url"] = entry.research_paper_url || "";

  summaryDict["noted_biases"] =
    entry.noted_biases
      ? Object.keys(entry.noted_biases)[0] || ""
      : "";

  summaryDict["data_download_urls"] = entry.data_download_urls || [];
  summaryDict["alternate_url"] = entry.alternate_url || "";
  summaryDict["signoff_by"] = entry.signoff_by || "";
  summaryDict["signoff_ts"] = entry.signoff_ts || "";

  return summaryDict;
}

const BASE_URL = "https://api.fastcatalog.ai/v1";
const SEARCH_API_URL = `${BASE_URL}/catalog-entries`;
const TOKEN = process.env.FASTCATALOG_TOKEN || "YOUR_BEARER_TOKEN"; // Replace with your token

const payload = {
  homepages: ["https://huggingface.co/datasets/Salesforce/xlam-function-calling-60k"]
};

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json"
};

const limit = 3;

(async () => {
  try {
    // Search API call
    const searchResp = await axios.post(
      `${SEARCH_API_URL}?limit=${limit}`,
      payload,
      { headers }
    );
    // Get first fcai_uuid
    const UUID = searchResp.data.entries[0].fcai_uuid;

    // Retrieve API call
    const retrieveResp = await axios.get(
      `${BASE_URL}/catalog-entries/${UUID}`,
      { headers }
    );

    const summary = makeSummaryDict(retrieveResp.data);

    console.log(retrieveResp.status, JSON.stringify(summary, null, 2));
  } catch (err) {
    if (err.response) {
      console.error(err.response.status, err.response.data);
    } else {
      console.error(err.message);
    }
  }
})();
