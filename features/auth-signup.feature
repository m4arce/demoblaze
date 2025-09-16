Feature: Registro de usuario (Sign up)
  # Este feature cubre todos los casos relevantes para la creación de usuario en demoblaze.com

  Background:
    Given I open the demoblaze home page

  @signup_positive
  Scenario: New User Successful Registration
    When I open the sign up modal
    And I create a new user with username generado y password válido
    Then I should see an alert with text "Sign up successful."

  @signup_negative_existing
  Scenario: Existing User Registration
    When I open the sign up modal
    And I create a new user with username "existing_user" y password "Password123!"
    Then I should see an alert containing "This user already exist"

  @signup_border_empty
  Scenario: Empty Fields Registration
    When I open the sign up modal
    And I create a new user with username "" y password ""
  Then I should see an alert indicating required fields in sign up

  # Puedes agregar más escenarios de borde según la lógica de negocio (contraseña corta, caracteres especiales, etc.)
