# language: en
Feature: Product Navigation and Price Display
  As a customer
  I want to browse products and view their details
  So that I can make informed purchasing decisions

  The marketplace application allows customers to view a list of products
  and navigate to individual product detail pages to see complete information
  including pricing, images, and seller details.

  Rule: Product List Display
    The product list should display all available products with basic information
    and provide navigation to detailed product pages.

  Rule: Product Detail Information
    Product detail pages should show complete product information including
    accurate pricing, images, descriptions, and seller information.

  Background:
    Given the marketplace application is running
    And the backend API is accessible
    And product data is loaded in the system

  Scenario Outline: Customer views product list and navigates to product detail
    Given I am on the product list page
    When I see the product "<product_title>"
    And I click "Ver detalle" for that product
    Then I should be navigated to the product detail page
    And I should see the product price "<expected_price>"
    And I should see the product title "<product_title>"
    And I should see product images
    And I should see seller information

    Examples:
      | product_title                                                    | expected_price |
      | Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM      | 1853861        |
      | Samsung Galaxy NNNNN 5G Dual SIM 256 GB azul oscuro 8 GB RAM    | 1853861        |

  Scenario: Customer verifies specific Samsung product price
    Given I am on the product list page
    When I see the product "Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM"
    And I click "Ver detalle" for that product
    Then I should be navigated to "/product/1"
    And I should see the exact price "1853861"
    And I should see the product description
    And I should see payment methods available
    And I should see seller reputation information

  Scenario: Customer can add product to shopping cart
    Given I am on the product detail page for "Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM"
    When I click "Agregar al carrito"
    Then the shopping cart should be displayed
    And the product should be added to the cart
    And the cart should show the correct price "1853861"

  Scenario: Customer can return to product list
    Given I am on the product detail page
    When I navigate back to the product list
    Then I should see all available products
    And I should be able to select different products

  Scenario: Product list displays essential information
    Given I am on the product list page
    Then I should see product images
    And I should see product titles
    And I should see product prices
    And I should see "Ver detalle" buttons for each product

  Scenario: Product detail page shows complete information
    Given I am on the product detail page for any product
    Then I should see the product title
    And I should see the product price
    And I should see product images with thumbnail navigation
    And I should see the product description
    And I should see seller information
    And I should see payment methods
    And I should see stock availability
    And I should see "Comprar ahora" and "Agregar al carrito" buttons 