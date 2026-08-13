Feature: DummyJSON Authenticated User Profile

  @api @profile
  Scenario: Fetch the current user profile using the cached access token
    Given The user has successfully logged in and obtained a token
    When A GET request is sent to the DummyJSON current user endpoint
    Then The profile API response status code should be 200
    And The response should contain the user details including the username "emilys"