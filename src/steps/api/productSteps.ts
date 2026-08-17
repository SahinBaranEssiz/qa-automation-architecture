import { When, Then } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { CustomWorld } from '../../core/customWorld';
import { ProductService } from '../../services/ProductService';

When('A GET request is sent to the DummyJSON products endpoint', async function (this: CustomWorld) {
    const requestContext = await request.newContext();
    const productService = new ProductService(requestContext);
    
    await productService.getProducts();
    
    // CustomWorld'e kaydediyoruz ki 'Then' adımlarında erişebilelim
    this.productService = productService; 
});

Then('The products API response status code should be {int}', async function (this: CustomWorld, statusCode: number) {
    await this.productService.verifyStatusCode(statusCode);
});

Then('The response should contain exactly {int} products', async function (this: CustomWorld, expectedCount: number) {
    await this.productService.verifyProductCount(expectedCount);
});