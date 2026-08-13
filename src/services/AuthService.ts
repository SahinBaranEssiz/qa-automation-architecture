import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export const apiStorage = {
    accessToken: '',
    refreshToken: ''
};

export class AuthService {
    private request: APIRequestContext;
    private baseUrl = 'https://dummyjson.com';
    private response!: APIResponse;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async login(username: string, password: string) {
        this.response = await this.request.post(`${this.baseUrl}/auth/login`, {
            data: {
                username: username,
                password: password,
                expiresInMins: 30
            }
        });
    }

    async verifyStatusCode(expectedStatus: number) {
        expect(this.response.status()).toBe(expectedStatus);
    }

    async extractAndSaveToken() {
        const responseBody = await this.response.json();

        expect(responseBody.accessToken).toBeDefined();

        apiStorage.accessToken = responseBody.accessToken;
        console.log(`\n[SUCCESS] Token Cached: ${apiStorage.accessToken.substring(0, 15)}...`);
    }

    async verifyErrorMessage(expectedMessage: string) {
        const responseBody = await this.response.json();
        expect(responseBody.message).toBe(expectedMessage);
    }
}