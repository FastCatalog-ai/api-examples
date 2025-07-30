import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UUID = "e6bf1ff1-fba7-4fe4-bd82-6e79a3d745ba"
const API_URL = `https://api.fastcatalog.ai/v1/catalog-entries/${UUID}/lineage`;
const TOKEN = process.env.FASTCATALOG_TOKEN || "YOUR_BEARER_TOKEN";
const payload = {
  fcai_uuid: [UUID],
  max_depth: 3 // or as needed, up to 10
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
