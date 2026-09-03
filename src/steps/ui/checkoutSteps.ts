import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../core/customWorld';
import { SignupPage } from '../../pages/SignupPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';
import { CheckoutFlowPage } from '../../pages/CheckoutFlowPage';

Given('The user creates a new dynamic account and logs in', async function (this: CustomWorld) {
    const signupPage = new SignupPage(this.page!);
    await signupPage.registerDynamicUser();
    
    console.log(`[INFO] Pre-condition met: A fresh dynamic user is created and logged in.`);
});

When('The user navigates to the Products page and searches for {string}', async function (this: CustomWorld, productName: string) {
    // Direct URL navigation is used here for execution speed
    await this.page?.goto('https://automationexercise.com/products');
    
    const productsPage = new ProductsPage(this.page!);
    await productsPage.searchAndSelectProduct(productName);
});

When('The user opens the product details and adds {int} items to the cart', async function (this: CustomWorld, quantity: number) {
    const productDetailsPage = new ProductDetailsPage(this.page!);
    await productDetailsPage.addProductToCartWithQuantity(quantity);
});

When('The user proceeds to checkout from the cart', async function (this: CustomWorld) {
    const checkoutFlowPage = new CheckoutFlowPage(this.page!);
    await checkoutFlowPage.proceedToCheckout();
});

When('The user enters the order comment {string} and places the order', async function (this: CustomWorld, comment: string) {
    const checkoutFlowPage = new CheckoutFlowPage(this.page!);
    await checkoutFlowPage.leaveCommentAndPlaceOrder(comment);
});

When('The user completes the payment process with valid card details', async function (this: CustomWorld) {
    const checkoutFlowPage = new CheckoutFlowPage(this.page!);
    await checkoutFlowPage.completePayment();
});

Then('The system should display the {string} success message', async function (this: CustomWorld, expectedMessage: string) {
    const checkoutFlowPage = new CheckoutFlowPage(this.page!);
    await checkoutFlowPage.verifyOrderSuccessAndReturnHome();
});

Then('The user clicks continue to return to the homepage', async function (this: CustomWorld) {
    await this.page?.waitForURL('https://automationexercise.com/');
    console.log(`[INFO] E2E Checkout Flow completed successfully. Returned to homepage.`);
});