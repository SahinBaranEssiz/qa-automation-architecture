Feature: User Login System

  @ui @login
  Scenario: Login User with correct email and password
    Given A brand new user account is created and logged out
    And The user is on the Automation Exercise login page
    When The user logs in with the newly created credentials
    Then The system should verify that the user is logged in
    And The user deletes the account successfully