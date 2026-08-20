import { Given, When, Then } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { CustomWorld } from '../../core/customWorld';
import { ProductService } from '../../services/ProductService';

// ------------------------------------------------------------------
// GET PRODUCTS STEPS
// ------------------------------------------------------------------

When('A GET request is sent to the DummyJSON products endpoint', async function (this: CustomWorld) {
    // Initialize the API context without launching a browser
    const requestContext = await request.newContext();
    const productService = new ProductService(requestContext);
    
    // Fetch products
    await productService.getProducts();
    
    // Store the service instance in CustomWorld for subsequent steps
    this.productService = productService; 
});

Then('The products API response status code should be {int}', async function (this: CustomWorld, statusCode: number) {
    // This step is reusable for both GET and PUT responses!
    await this.productService.verifyStatusCode(statusCode);
});

Then('The response should contain exactly {int} products', async function (this: CustomWorld, expectedCount: number) {
    await this.productService.verifyProductCount(expectedCount);
});

// ------------------------------------------------------------------
// UPDATE PRODUCT STEPS
// ------------------------------------------------------------------

// Variable to store the ID of the product we want to update
let targetProductId: number;

Given('The API user targets product ID {int} for an update', function (productId: number) {
    // Save the target ID for the upcoming PUT request
    targetProductId = productId;
});

When('A PUT request is sent to update the product title to {string}', async function (this: CustomWorld, newTitle: string) {
    const requestContext = await request.newContext();
    const productService = new ProductService(requestContext);
    
    // Send the PUT request using the saved ID and the new title
    await productService.updateProductTitle(targetProductId, newTitle);
    
    this.productService = productService; 
});

Then('The API response should reflect the updated product title {string}', async function (this: CustomWorld, expectedTitle: string) {
    // Verify the title in the response JSON
    await this.productService.verifyUpdatedTitle(expectedTitle);
});