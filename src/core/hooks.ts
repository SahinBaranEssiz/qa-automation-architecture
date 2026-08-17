import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from './customWorld';

// Global timeout setup
setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld, { pickle }) {
    // Check if the current scenario has the '@api' tag
    const isApiTest = pickle.tags.some((tag) => tag.name === '@api');

    if (isApiTest) {
        // Skip browser initialization for API tests
        console.log(`\n[INFO] Starting API test: ${pickle.name} (Browserless)`);
        return;
    }

    // Initialize browser for UI tests
    console.log(`\n[INFO] Starting UI test: ${pickle.name} (Launching Browser)`);
    this.browser = await chromium.launch({
        headless: false // UI tests will show the browser
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, { pickle, result }) {
    const isApiTest = pickle.tags.some((tag) => tag.name === '@api');

    // Log the test result
    console.log(`[INFO] Test completed with status: ${result?.status}`);

    if (isApiTest) {
        // Nothing to close for API tests since we didn't open a browser here
        return;
    }

    // Teardown for UI tests
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});