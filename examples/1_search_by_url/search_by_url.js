import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKEN = process.env.FASTCATALOG_TOKEN || "YOUR_BEARER_TOKEN";

const API_URL = "https://api.fastcatalog.ai/v1/catalog-entries";

const payload = {
  homepages: ["https://huggingface.co/datasets/Salesforce/xlam-function-calling-60k"]
};

axios.post(API_URL, payload, {
  headers: {
    "Authorization": `Bearer ${TOKEN}`,
    "Content-Type": "application/json"
  }
}).then(res => {
  console.log(JSON.stringify(res.data, null, 2));
}).catch(err => {
  if (err.response) {
    console.error(err.response.status, err.response.data);
  } else {
    console.error(err);
  }
});
