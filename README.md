# FastCatalog.ai API Examples

This repository provides simple Python and JavaScript code samples for interacting with the [FastCatalog.ai API](https://api.fastcatalog.ai/). Each example demonstrates a specific API scenario, such as searching for datasets, retrieving metadata, generating spreadsheets reports, and more.

## Overview

The examples are organized into scenario-based folders under `examples/`, each with both `.js` (JavaScript) and `.py` (Python) implementations.

### Example Scenarios

1. **Search by Dataset URL**  
   Search the catalog for a dataset using its homepage URL.

2. **Complex Search**  
   Search for a dataset or model using a combination of filters, pick the best match, get its UUID and retrieve its details.

3. **Get Dataset Terms**  
   Retrieve details of a dataset, including its terms, by UUID.

4. **Get AI Model Provenance (Lineage)**  
   Retrieve lineage/provenance information for an AI model using its UUID.

5. **Generate Dataset Spreadsheet**  
   Generate and download a spreadsheet for a catalog entry.

## Usage

### Prerequisites

- Node.js and/or Python 3.x installed.
- [FastCatalog.ai API token](https://api.fastcatalog.ai/) saved as `FASTCATALOG_TOKEN` in `secrets/keys.env`.

### Running the examples

Python

```bash
./run_all_python_examples.sh
```

JS

```bash
./run_all_js_examples.sh
```
