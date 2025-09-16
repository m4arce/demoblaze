Feature: Login de usuario
  # Escenarios para validar el login en demoblaze.com

  Background:
    Given I have a valid user registered
    And I open the demoblaze home page

  @login_positive
  Scenario: Successful login with valid user
    When I open the login modal
    And I login with the registered username and password
    Then I should see a welcome message with the username

  @login_negative
  Scenario: Login with unregistered user
    When I open the login modal
    And I login with username "usuario_invalido" and password "Password123!"
    Then I should see an alert indicating invalid credentials

  @login_border_empty
  Scenario: Login with empty fields
    When I open the login modal
    And I login with username "" and password ""
    Then I should see an alert indicating required fields in login

@login_sqlinjection
Scenario Outline: Login with SQL injection attempt
  When I open the login modal
  And I login with username "<username>" and password "<password>"
  Then I should see an alert indicating invalid credentials

  Examples:
    | username            | password           |
    | ' OR '1'='1         | Password123!       |
    | admin' --           | Password123!       |
    | testuser_demo_68163 | ' OR '1'='1        |
    | testuser_demo_68163 | admin' --          |

@login_xss
Scenario Outline: Login with XSS attempt
  When I open the login modal
  And I login with username "<username>" and password "<password>"
  Then I should see an alert indicating invalid credentials

  Examples:
    | username                      | password           |
    | <script>alert('xss')</script> | Password123!       |
    | testuser_demo_68163           | <img src=x onerror=alert('xss')> |