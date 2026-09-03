import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class ProductService {
    private request: APIRequestContext;
    private baseUrl = 'https://dummyjson.com';
    private response!: APIResponse;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    /**
     * Sends a public GET request to retrieve the list of products without requiring authorization.
     */
    async getProducts() {
        this.response = await this.request.get(`${this.baseUrl}/products`);
    }

    /**
     * Asserts that the HTTP response status code matches the expected value.
     */
    async verifyStatusCode(expectedStatus: number) {
        expect(this.response.status()).toBe(expectedStatus);
    }

    /**
     * Verifies that the length of the products array in the response matches the expected count.
     */
    async verifyProductCount(expectedCount: number) {
        const responseBody = await this.response.json();
        expect(responseBody.products.length).toBe(expectedCount);
        
        console.log(`\n[INFO] Length of the drawn product sequence: ${responseBody.products.length}`);
    }

    /**
     * Sends a PUT request to update the title of an existing product.
     */
    async updateProductTitle(productId: number, newTitle: string) {
        this.response = await this.request.put(`${this.baseUrl}/products/${productId}`, {
            data: {
                title: newTitle
            }
        });
        
        console.log(`\n[INFO] Sent PUT request to update product ID ${productId} with new title: "${newTitle}"`);
    }

    /**
     * Verifies if the server correctly saved and returned the updated product title.
     */
    async verifyUpdatedTitle(expectedTitle: string) {
        const responseBody = await this.response.json();
        expect(responseBody.title).toBe(expectedTitle);
        
        console.log(`[INFO] Successfully verified that the product title is now: "${responseBody.title}"`);
    }
}