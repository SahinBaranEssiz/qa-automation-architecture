import { Page, expect } from '@playwright/test';

export class ProductsPage {
    private page: Page;

    // Locators for product search and selection
    private searchInput = 'input#search_product';
    private searchButton = 'button#submit_search';
    private viewProductButton = '.choose > .nav > li > a';

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Searches for a specific product and selects the first matching result.
     */
    async searchAndSelectProduct(productName: string) {
        await this.page.locator(this.searchInput).fill(productName);
        console.log(`[INFO] Entered search keyword: "${productName}"`);

        await this.page.locator(this.searchButton).click();

        await this.page.locator(this.viewProductButton).first().click();
        console.log(`[INFO] Clicked on 'View Product' for the search result.`);
    }
}