Feature: Automation Exercise End-to-End Checkout Flow

  @ui @checkout @e2e
  Scenario: Search for a product, add multiple quantities to cart, and complete the order
    Given The user creates a new dynamic account and logs in
    When The user navigates to the Products page and searches for "Frozen Tops For Kids"
    And The user opens the product details and adds 3 items to the cart
    And The user proceeds to checkout from the cart
    And The user enters the order comment "I am buying this for my triplets' birthday; could you gift-wrap it?" and places the order
    And The user completes the payment process with valid card details
    Then The system should display the "Order Placed!" success message
    And The user clicks continue to return to the homepage