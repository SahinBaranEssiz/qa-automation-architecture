Feature: User Registration System

  @ui @register
  Scenario: New user can successfully register with valid credentials
    Given The user is on the Automation Exercise homepage
    When The user proceeds to the signup page
    And The user registers with a randomly generated valid account
    Then The system should verify that the account was successfully created