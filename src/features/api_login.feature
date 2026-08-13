Feature: DummyJSON API Auth Service

  @api @happy-path
  Scenario: Successfully login and store the access token
    Given The API user has valid credentials "emilys" and "emilyspass"
    When A POST request is sent to the DummyJSON login endpoint
    Then The API response status code should be 200
    And The response should contain an access token to be saved for subsequent requests

  @api @negative
  Scenario Outline: Fail to login with invalid API credentials (<description>)
    Given The API user has valid credentials "<username>" and "<password>"
    When A POST request is sent to the DummyJSON login endpoint
    Then The API response status code should be 400
    And The API response error message should be "<expected_error>"

    Examples:
      | username   | password   | description        | expected_error                 |
      | wrongusr   | emilyspass | Invalid username   | Invalid credentials            |
      | emilys     | wrongpass  | Incorrect password | Invalid credentials            |
      |            | emilyspass | Empty username     | Username and password required |
      | kminchelle |            | Empty password     | Username and password required |
      |            |            | Both empty         | Username and password required |
