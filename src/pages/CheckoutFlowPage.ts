import { Page, expect } from '@playwright/test';

export class CheckoutFlowPage {
    private page: Page;
    
    // Locators for Cart, Checkout, and Payment steps
    private proceedToCheckoutButton = '.check_out';
    private commentTextArea = 'textarea[name="message"]';
    private placeOrderButton = 'a[href="/payment"]';
    
    // Payment form locators
    private nameOnCardInput = 'input[data-qa="name-on-card"]';
    private cardNumberInput = 'input[data-qa="card-number"]';
    private cvcInput = 'input[data-qa="cvc"]';
    private expiryMonthInput = 'input[data-qa="expiry-month"]';
    private expiryYearInput = 'input[data-qa="expiry-year"]';
    private payAndConfirmButton = 'button[data-qa="pay-button"]';
    
    // Success page locators
    private orderPlacedMessage = '[data-qa="order-placed"]';
    private continueButton = '[data-qa="continue-button"]';

    constructor(page: Page) {
        this.page = page;
    }

    async proceedToCheckout() {
        await this.page.locator(this.proceedToCheckoutButton).click();
        console.log(`[INFO] Clicked 'Proceed To Checkout' from the cart.`);
    }

    async leaveCommentAndPlaceOrder(comment: string) {
        // Scroll down to the comment box, fill it, and proceed
        await this.page.locator(this.commentTextArea).fill(comment);
        console.log(`[INFO] Added order comment: "${comment}"`);
        await this.page.locator(this.placeOrderButton).click();
    }

    async completePayment() {
        // Fill out dummy credit card information for the test
        // In real projects, we store these in environment variables (.env), not directly in code!
        await this.page.locator(this.nameOnCardInput).fill('QA Automation Engineer');
        await this.page.locator(this.cardNumberInput).fill('4111222233334444');
        await this.page.locator(this.cvcInput).fill('123');
        await this.page.locator(this.expiryMonthInput).fill('12');
        await this.page.locator(this.expiryYearInput).fill('2030');
        
        await this.page.locator(this.payAndConfirmButton).click();
        console.log(`[INFO] Payment details submitted.`);
    }

    async verifyOrderSuccessAndReturnHome() {
        // Assert that the success message is visible on the screen
        const successMessage = this.page.locator(this.orderPlacedMessage);
        await expect(successMessage).toBeVisible();
        console.log(`[INFO] SUCCESS: 'Order Placed!' message is visible.`);
        
        // Click continue to finish the flow and return to homepage
        await this.page.locator(this.continueButton).click();
    }
}