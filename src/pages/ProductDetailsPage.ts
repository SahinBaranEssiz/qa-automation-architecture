import { Page, expect } from '@playwright/test';

export class ProductDetailsPage {
    private page: Page;
    
    // Locators for the Product Details page
    private quantityInput = 'input#quantity';
    private addToCartButton = 'button.cart';
    private viewCartLink = 'u:has-text("View Cart")'; // The link inside the success modal

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Updates the quantity of the product, adds it to the cart, and navigates to the Cart page.
     * @param quantity - The number of items to add
     */
    async addProductToCartWithQuantity(quantity: number) {
        // 1. Clear the default quantity (usually 1) and fill it with our desired number
        await this.page.locator(this.quantityInput).fill(quantity.toString());
        console.log(`[INFO] Set product quantity to: ${quantity}`);
        
        // 2. Click the 'Add to cart' button
        await this.page.locator(this.addToCartButton).click();
        
        // 3. Wait for the modal popup to appear and click 'View Cart'
        // Using waitFor ensures the test doesn't fail if the modal animation is slow
        const viewCartLocator = this.page.locator(this.viewCartLink);
        await viewCartLocator.waitFor({ state: 'visible' });
        await viewCartLocator.click();
        
        console.log(`[INFO] Product added to cart successfully. Navigating to Cart page.`);
    }
}