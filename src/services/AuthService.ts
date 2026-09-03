import { APIRequestContext, APIResponse, expect } from '@playwright/test';

// Global storage for caching API tokens during test execution
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

    /**
     * Authenticates a user by sending credentials to the login endpoint.
     * The response is stored internally for subsequent assertions.
     */
    async login(username: string, password: string) {
        this.response = await this.request.post(`${this.baseUrl}/auth/login`, {
            data: {
                username: username,
                password: password,
                expiresInMins: 30
            }
        });
    }

    /**
     * Asserts that the HTTP response status code matches the expected value.
     */
    async verifyStatusCode(expectedStatus: number) {
        expect(this.response.status()).toBe(expectedStatus);
    }

    /**
     * Extracts the access token from a successful login response and caches it in global storage.
     */
    async extractAndSaveToken() {
        const responseBody = await this.response.json();

        expect(responseBody.accessToken).toBeDefined();

        apiStorage.accessToken = responseBody.accessToken;
        console.log(`\n[SUCCESS] Token Cached: ${apiStorage.accessToken.substring(0, 15)}...`);
    }

    /**
     * Asserts that the response body contains the expected error message.
     */
    async verifyErrorMessage(expectedMessage: string) {
        const responseBody = await this.response.json();
        expect(responseBody.message).toBe(expectedMessage);
    }
}