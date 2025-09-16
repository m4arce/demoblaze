Feature: Home - Product Catalog
  # Escenarios para validar la navegación y visualización de productos en demoblaze.com

  Background:
    Given I open the demoblaze home page

  @home_list_first
  Scenario: List products and validate the first product
    When I list the products
    Then the first product should be "Samsung galaxy s6"

# Este assert debe fallar si Samsung desaparece
  @home_next
  Scenario: Validate when returning to the first page the first product is the same
    When I list the products
    Then the first product should be "Samsung galaxy s6"
    When I click next on the product list
    Then the first product should be "Apple monitor 24"
    When I click previous on the product list
    Then the first product should be "Samsung galaxy s6" 


  @home_category_count
  Scenario: Validate total products in Laptops category
    When I select category "Laptops"
    Then the product list should show 10 products
