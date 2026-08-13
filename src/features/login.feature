Feature: User Login System

  @ui @login
  Scenario: Login User with correct email and password
    Given A brand new user account is created and logged out
    And The user is on the Automation Exercise login page
    When The user logs in with the newly created credentials
    Then The system should verify that the user is logged in
    And The user deletes the account successfully

  @ui @login @negative
  Scenario Outline: Login with invalid credentials (<description>)
    Given The user is on the Automation Exercise login page
    When The user tries to login with "<email>" and "<password>"
    Then The system should show the login error message

    Examples:
      | email              | password     | description           |
      | wronguser@test.com | Test1234!    | Geçersiz e-posta      |
      | correct@test.com   | WrongPass123 | Geçersiz şifre        |
      | invalidformat.com  |        12345 | Bozuk e-posta formatı |
      |                    | Test1234!    | Boş e-posta alanı     |
