import { Page } from '@playwright/test';

export class HomePage {
    private page: Page;

    // Locators for the home page navigation
    private signupLoginLink = 'a[href="/login"]';
    private baseUrl = process.env.UI_BASE_URL as string;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigates to the base application URL and waits for the DOM content to load.
     * Includes an explicit 60-second timeout for stable execution in CI/CD environments.
     */
    async navigateToHome() {
        await this.page.goto(this.baseUrl, { 
            waitUntil: 'domcontentloaded', 
            timeout: 60000 
        });
    }

    /**
     * Clicks the Signup/Login link in the header navigation.
     */
    async clickSignupLoginButton() {
        await this.page.click(this.signupLoginLink);
    }
}