import { Given, When, Then } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { CustomWorld } from '../../core/customWorld';
import { ProductService } from '../../services/ProductService';

// ------------------------------------------------------------------
// GET PRODUCTS STEPS
// ------------------------------------------------------------------

When('A GET request is sent to the DummyJSON products endpoint', async function (this: CustomWorld) {
    const requestContext = await request.newContext();
    const productService = new ProductService(requestContext);
    
    await productService.getProducts();
    this.productService = productService; 
});

Then('The products API response status code should be {int}', async function (this: CustomWorld, statusCode: number) {
    await this.productService.verifyStatusCode(statusCode);
});

Then('The response should contain exactly {int} products', async function (this: CustomWorld, expectedCount: number) {
    await this.productService.verifyProductCount(expectedCount);
});

// ------------------------------------------------------------------
// UPDATE PRODUCT STEPS
// ------------------------------------------------------------------

let targetProductId: number;

Given('The API user targets product ID {int} for an update', function (productId: number) {
    targetProductId = productId;
});

When('A PUT request is sent to update the product title to {string}', async function (this: CustomWorld, newTitle: string) {
    const requestContext = await request.newContext();
    const productService = new ProductService(requestContext);
    
    await productService.updateProductTitle(targetProductId, newTitle);
    this.productService = productService; 
});

Then('The API response should reflect the updated product title {string}', async function (this: CustomWorld, expectedTitle: string) {
    await this.productService.verifyUpdatedTitle(expectedTitle);
});