import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UUID = "33f6a9f7-195e-4d51-9a63-134304756255"
const TOKEN = process.env.FASTCATALOG_TOKEN || "YOUR_BEARER_TOKEN";
const API_URL = `https://api.fastcatalog.ai/v1/catalog-entries/${UUID}`;


axios.get(API_URL, {
  headers: {
    "Authorization": `Bearer ${TOKEN}`
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
