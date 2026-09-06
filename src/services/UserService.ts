import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { apiStorage } from './AuthService';

export class UserService {
    private request: APIRequestContext;
    private baseUrl = process.env.API_BASE_URL as string;
    private response!: APIResponse;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    /**
     * Fetches the current user's profile by injecting the cached access token into the authorization header.
     */
    async getCurrentUser() {
        this.response = await this.request.get(`${this.baseUrl}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${apiStorage.accessToken}`
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
     * Verifies that the username in the response body matches the expected user.
     */
    async verifyUsername(expectedUsername: string) {
        const responseBody = await this.response.json();
        expect(responseBody.username).toBe(expectedUsername);
        
        console.log(`\n[VERIFIED] User whose profile was accessed via token: ${responseBody.firstName} ${responseBody.lastName}`);
    }
}