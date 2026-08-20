import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class ProductService {
    private request: APIRequestContext;
    private baseUrl = 'https://dummyjson.com';
    private response!: APIResponse;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getProducts() {
        // Herhangi bir yetkilendirme (Token) gerektirmeyen public bir GET isteği atıyoruz
        this.response = await this.request.get(`${this.baseUrl}/products`);
    }

    async verifyStatusCode(expectedStatus: number) {
        expect(this.response.status()).toBe(expectedStatus);
    }

    async verifyProductCount(expectedCount: number) {
        const responseBody = await this.response.json();
        
        // API'den dönen JSON'ın içindeki 'products' dizisinin (Array) uzunluğunu (length) doğruluyoruz
        expect(responseBody.products.length).toBe(expectedCount);
        
        console.log(`\n[INFO] Length of the drawn product sequence: ${responseBody.products.length}`);
    }

    /**
     * Sends a PUT request to update specific fields of an existing product.
     * In API testing, PUT is used to modify or replace data on the server.
     * 
     * @param productId - The unique ID of the product we want to update
     * @param newTitle - The new title text we want to set for this product
     */
    async updateProductTitle(productId: number, newTitle: string) {
        this.response = await this.request.put(`${this.baseUrl}/products/${productId}`, {
            // The 'data' object represents the JSON payload (body) we are sending to the server.
            data: {
                title: newTitle
            }
        });
        
        console.log(`\n[INFO] Sent PUT request to update product ID ${productId} with new title: "${newTitle}"`);
    }

    /**
     * Verifies if the server correctly saved and returned our updated title.
     * 
     * @param expectedTitle - The exact title string we expect to see in the server's response
     */
    async verifyUpdatedTitle(expectedTitle: string) {
        // We extract the JSON data from the server's response
        const responseBody = await this.response.json();
        
        // We assert (check) that the 'title' field in the response matches what we sent
        expect(responseBody.title).toBe(expectedTitle);
        
        console.log(`[INFO] Successfully verified that the product title is now: "${responseBody.title}"`);
    }
}