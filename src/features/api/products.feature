Feature: DummyJSON Products API

  @api @products @get-products
  Scenario: Fetch a list of products and verify the default limit count
    When A GET request is sent to the DummyJSON products endpoint
    Then The products API response status code should be 200
    And The response should contain exactly 30 products

  @api @products @update-product
  Scenario: Update an existing product's title and verify the changes
    Given The API user targets product ID 1 for an update
    When A PUT request is sent to update the product title to "Playwright Automation Framework"
    Then The products API response status code should be 200
    And The API response should reflect the updated product title "Playwright Automation Framework"
