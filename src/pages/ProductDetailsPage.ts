import { Page, expect } from '@playwright/test';

export class ProductDetailsPage {
    private page: Page;

    // Locators for product interaction and cart management
    private quantityInput = 'input#quantity';
    private addToCartButton = 'button.cart';
    private viewCartLink = 'u:has-text("View Cart")';

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Updates the product quantity, adds the item to the cart, and waits for the success modal to navigate to the Cart page.
     */
    async addProductToCartWithQuantity(quantity: number) {
        await this.page.locator(this.quantityInput).fill(quantity.toString());
        console.log(`[INFO] Set product quantity to: ${quantity}`);

        await this.page.locator(this.addToCartButton).click();

        const viewCartLocator = this.page.locator(this.viewCartLink);
        await viewCartLocator.waitFor({ state: 'visible' });
        await viewCartLocator.click();

        console.log(`[INFO] Product added to cart successfully. Navigating to Cart page.`);
    }
}