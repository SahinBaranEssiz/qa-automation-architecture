import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { apiStorage } from './AuthService';

export class UserService {
    private request: APIRequestContext;
    private baseUrl = 'https://dummyjson.com';
    private response!: APIResponse;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getCurrentUser() {
        // GET isteğimizi atarken Headers kısmına daha önce hafızaya aldığımız token'ı ekliyoruz
        this.response = await this.request.get(`${this.baseUrl}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${apiStorage.accessToken}`
            }
        });
    }

    async verifyStatusCode(expectedStatus: number) {
        expect(this.response.status()).toBe(expectedStatus);
    }

    async verifyUsername(expectedUsername: string) {
        const responseBody = await this.response.json();
        expect(responseBody.username).toBe(expectedUsername);
        
        console.log(`\n[VERIFIED] User whose profile was accessed via token: ${responseBody.firstName} ${responseBody.lastName}`);
    }
}