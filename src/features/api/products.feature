Feature: DummyJSON Products API

  @api @products
  Scenario: Fetch a list of products and verify the default limit count
    When A GET request is sent to the DummyJSON products endpoint
    Then The products API response status code should be 200
    And The response should contain exactly 30 products