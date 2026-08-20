import { Page, expect } from '@playwright/test';

export class ProductsPage {
    private page: Page;
    
    // Locators for the Products page
    private searchInput = 'input#search_product';
    private searchButton = 'button#submit_search';
    private viewProductButton = '.choose > .nav > li > a'; // The button under the searched product

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Searches for a specific product and clicks its 'View Product' button.
     * @param productName - The exact name of the product to search
     */
    async searchAndSelectProduct(productName: string) {
        // 1. Fill the search box
        await this.page.locator(this.searchInput).fill(productName);
        console.log(`[INFO] Entered search keyword: "${productName}"`);
        
        // 2. Click the search button
        await this.page.locator(this.searchButton).click();
        
        // 3. Scroll down slightly to make the product visible, then click 'View Product'
        // We use first() because the search might return multiple items, we want the first match.
        await this.page.locator(this.viewProductButton).first().click();
        console.log(`[INFO] Clicked on 'View Product' for the search result.`);
    }
}