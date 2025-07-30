import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKEN = process.env.FASTCATALOG_TOKEN || "YOUR_BEARER_TOKEN";