# 🚀 Playwright & Cucumber BDD Test Automation Framework

This repository contains a robust, hybrid test automation framework designed for both **UI (End-to-End)** and **API** testing. Built with modern QA practices, it leverages Playwright for fast execution and Cucumber BDD for clear, business-readable test scenarios.

## 🏗️ Architecture & Design Patterns
* **Page Object Model (POM):** UI interactions are abstracted into dedicated page classes (`src/pages/`) for maximum reusability and clean step definitions.
* **Service Object Model (SOM):** API requests and validations are encapsulated within service classes (`src/services/`) ensuring a clear separation of concerns.
* **Environment Management:** Base URLs and environment-specific data are managed dynamically via `dotenv`, allowing seamless cross-environment testing without code changes.
* **Smart Execution:** UI tests run with full browser contexts, while API tests execute in a completely browserless state for maximum speed.

## 🛠️ Technology Stack
* **Automation Tool:** [Playwright](https://playwright.dev/)
* **BDD Framework:** [Cucumber.js](https://cucumber.io/)
* **Language:** TypeScript
* **Configuration:** dotenv

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd <your-project-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables (Required):**
   *Note: For security reasons, the `.env` file is excluded from this repository via `.gitignore`. The framework will not run without it.*
   
   Please create a `.env` file in the root directory of the project and add the following URLs:
   ```env
   UI_BASE_URL=[https://automationexercise.com](https://automationexercise.com)
   API_BASE_URL=[https://dummyjson.com](https://dummyjson.com)
   ```

## 🚀 Running the Tests

To execute all BDD scenarios (both UI and API), run:
```bash
npm run test
```
*(Or use your specific cucumber-js execution script defined in package.json)*
