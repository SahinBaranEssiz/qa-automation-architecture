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
}