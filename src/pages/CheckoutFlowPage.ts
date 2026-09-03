import { Page, expect } from '@playwright/test';

export class CheckoutFlowPage {
    private page: Page;

    // Locators for the checkout and payment pipeline
    private proceedToCheckoutButton = '.check_out';
    private commentTextArea = 'textarea[name="message"]';
    private placeOrderButton = 'a[href="/payment"]';
    private nameOnCardInput = 'input[data-qa="name-on-card"]';
    private cardNumberInput = 'input[data-qa="card-number"]';
    private cvcInput = 'input[data-qa="cvc"]';
    private expiryMonthInput = 'input[data-qa="expiry-month"]';
    private expiryYearInput = 'input[data-qa="expiry-year"]';
    private payAndConfirmButton = 'button[data-qa="pay-button"]';
    private orderPlacedMessage = '[data-qa="order-placed"]';
    private continueButton = '[data-qa="continue-button"]';

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Initiates the checkout process from the cart page.
     */
    async proceedToCheckout() {
        await this.page.locator(this.proceedToCheckoutButton).click();
        console.log(`[INFO] Clicked 'Proceed To Checkout' from the cart.`);
    }

    /**
     * Fills in the order comment and advances to the payment section.
     */
    async leaveCommentAndPlaceOrder(comment: string) {
        await this.page.locator(this.commentTextArea).fill(comment);
        console.log(`[INFO] Added order comment: "${comment}"`);
        await this.page.locator(this.placeOrderButton).click();
    }

    /**
     * Submits the payment form using static dummy credentials.
     * Note: In a production environment, sensitive data should be retrieved from environment variables (.env).
     */
    async completePayment() {
        await this.page.locator(this.nameOnCardInput).fill('QA Automation Engineer');
        await this.page.locator(this.cardNumberInput).fill('4111222233334444');
        await this.page.locator(this.cvcInput).fill('123');
        await this.page.locator(this.expiryMonthInput).fill('12');
        await this.page.locator(this.expiryYearInput).fill('2030');

        await this.page.locator(this.payAndConfirmButton).click();
        console.log(`[INFO] Payment details submitted.`);
    }

    /**
     * Verifies the successful order message and navigates back to the homepage.
     */
    async verifyOrderSuccessAndReturnHome() {
        const successMessage = this.page.locator(this.orderPlacedMessage);
        await expect(successMessage).toBeVisible();
        console.log(`[INFO] SUCCESS: 'Order Placed!' message is visible.`);

        await this.page.locator(this.continueButton).click();
    }
}