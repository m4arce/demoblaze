Feature: Cart - Shopping Cart
  # Escenarios para validar la gestión del carrito en demoblaze.com

  Background:
    Given I open the demoblaze home page

  @cart_add_product
  Scenario: Add a product and validate it appears in the cart
    When I add product "Samsung galaxy s6" to the cart
    And I go to the cart
    Then the cart should contain "Samsung galaxy s6"

 #test debe fallar porque no tiene validacion de cantidad
  @cart_add_same_product_twice
  Scenario: Add the same product twice and validate quantity
    When I add product "Samsung galaxy s6" to the cart
    And I add product "Samsung galaxy s6" to the cart again
    And I go to the cart
    Then the cart should show quantity 2 for "Samsung galaxy s6" 

    @test_duplicate_product
Scenario: Add the same product twice and validate duplication
  When I add product "Samsung galaxy s6" to the cart
  And I add product "Samsung galaxy s6" to the cart again
  And I go to the cart
  Then the cart should contain "Samsung galaxy s6" twice

  @cart_remove_product
  Scenario: Remove a product from the cart
    Given I have product "Samsung galaxy s6" in the cart    
    When I go to the cart
    And I remove product "Samsung galaxy s6" from the cart    
    Then the cart should not contain "Samsung galaxy s6"

 @cart_add_multiple_products
Scenario: Add products from different categories and validate total
  When I add products to the cart:
    | Samsung galaxy s6 |
    | Sony vaio i5      |
  And I go to the cart
  Then the cart should contain the following products:
    | Samsung galaxy s6 |
    | Sony vaio i5      |
  And the cart total amount should be correct

#debe fallar puesto que no valida si el carro esta lleno
  @cart_checkout_empty
  Scenario: Try to checkout with an empty cart
    And I go to the cart
    When I open the order modal
    Then I should see an error message indicating the cart is empty
