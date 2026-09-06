import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from './customWorld';
import * as dotenv from 'dotenv';

dotenv.config();

setDefaultTimeout(60 * 1000);

/**
 * Pre-test setup hook.
 * Initializes a Playwright browser session for UI tests.
 * Skips browser initialization entirely for API tests based on the '@api' tag for execution speed.
 */
Before(async function (this: CustomWorld, { pickle }) {
    const isApiTest = pickle.tags.some((tag) => tag.name === '@api');

    if (isApiTest) {
        console.log(`\n[INFO] Starting API test: ${pickle.name} (Browserless)`);
        return;
    }

    console.log(`\n[INFO] Starting UI test: ${pickle.name} (Launching Browser)`);
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

/**
 * Post-test teardown hook.
 * Logs the execution status and safely terminates the browser instances for UI tests.
 */
After(async function (this: CustomWorld, { pickle, result }) {
    const isApiTest = pickle.tags.some((tag) => tag.name === '@api');

    console.log(`[INFO] Test completed with status: ${result?.status}`);

    if (isApiTest) return;

    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});