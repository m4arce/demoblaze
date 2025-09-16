
Feature: Purchase - Checkout Process
  # Escenarios para validar el proceso de compra en demoblaze.com

  Background:
    Given I open the demoblaze home page
    And I have product "Samsung galaxy s6" in the cart

  @purchase_valid
  Scenario: Complete purchase with valid data    
    When I go to the cart
    And I open the order modal
    And I fill the purchase form with valid data
    And I confirm the purchase
    Then I should see a success message
   

  @purchase_empty_fields
  Scenario: Try to purchase with empty fields    
    When I go to the cart
    And I open the order modal
    And I fill the purchase form with empty fields
    And I confirm the purchase
    Then I should see an error message indicating required fields

  # Este caso debería fallar por falta de validación
  @purchase_invalid_card
  Scenario: Enter non-numeric data in card field    
    When I go to the cart
    And I open the order modal
    And I fill the purchase form with card number "fake"
    And I confirm the purchase
    Then I should see an error message indicating invalid card number
    
  # Este caso debería fallar por falta de validación
  @purchase_special_characters
  Scenario: Enter special characters in form fields    
    When I go to the cart
    And I open the order modal
    And I fill the purchase form with name "!@#" and country "$$$"
    And I confirm the purchase
    Then I should see an error message indicating invalid characters

  @purchase_cart_cleared
  Scenario: Validate cart is cleared after purchase    
    When I go to the cart
    And I open the order modal
    And I fill the purchase form with valid data
    And I confirm the purchase
    Then I should see a success message
    When I go to the cart
    Then the cart should be empty

  # Este caso debería fallar porque igual permite comprar sin estar logueado
 @purchase_without_login
  Scenario: Try to purchase without being logged in 
  When I go to the cart
  And I open the order modal
  And I fill the purchase form with valid data
  And I confirm the purchase
  Then I should see an error message indicating login is required
