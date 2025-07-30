import axios from "axios";
import fs from "fs";
import path from "path";

const TOKEN = process.env.FASTCATALOG_TOKEN || "YOUR_BEARER_TOKEN";
const UUID = "33f6a9f7-195e-4d51-9a63-134304756255";
const API_URL = `https://api.fastcatalog.ai/v1/catalog-entries/${UUID}/spreadsheet`;
const TARGET_DIR = "output";

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const payload = {
  fcai_uuids: [UUID],
  filename: "catalog_items.xlsx",
  include_lineage: true,
  depth: 3
};

const headers = {
  "Authorization": `Bearer ${TOKEN}`,
  "Content-Type": "application/json"
};

axios.post(API_URL, payload, {
  headers,
  responseType: "stream"
})
.then(response => {
  const disposition = response.headers['content-disposition'] || '';
  let filename = "catalog_items.xlsx";
  const match = disposition.match(/filename="?([^"]+)"?/);
  if (match) filename = match[1];
  const filepath = path.join(TARGET_DIR, filename);

  const writer = fs.createWriteStream(filepath);
  response.data.pipe(writer);

  writer.on('finish', () => {
    console.log(`Saved: ${filepath}`);
  });

  writer.on('error', () => {
    console.error("Error: Could not write the file.");
  });
}).catch(err => {
  if (err.response && (err.response.status === 401 || err.response.status === 403)) {
    console.error(err.response.status, "Check your FASTCATALOG_TOKEN.");
  } else if (err.response) {
    console.error(`Error: ${err.response.status} ${err.response.statusText}`);
  } else {
    console.error("Network or script error.");
  }
});