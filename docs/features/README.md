# Gherkin Test Documentation

This directory contains Gherkin feature files that document the behavior of the Marketplace application using the [Cucumber Gherkin syntax](https://cucumber.io/docs/gherkin/reference).

## Overview

The Gherkin tests document the user journey for:
- Browsing the product list
- Navigating to product detail pages
- Verifying product information (including the specific price "1853861")
- Adding products to the shopping cart
- Testing the complete user experience

## Test Scenarios

### 1. Product Navigation Test
**Feature**: `product_navigation.feature`

This feature documents the test we performed to verify that:
- The product list displays correctly at `http://localhost:3000/`
- Users can click "Ver detalle" to navigate to product detail pages
- The Samsung Galaxy A55 product shows the correct price "1853861"
- All product information is displayed properly

**Key Scenarios**:
- **Scenario Outline**: Tests multiple products with different prices
- **Customer verifies specific Samsung product price**: The exact test we performed
- **Shopping cart functionality**: Tests the "Agregar al carrito" feature
- **Navigation**: Tests moving between product list and detail pages

## Running the Tests

### Prerequisites
1. Install Cucumber.js and dependencies:
```bash
npm install --save-dev @cucumber/cucumber @babel/register chai axios puppeteer
```

2. Ensure the application is running:
```bash
# Terminal 1: Backend
cd backend/msProduct && ./gradlew bootRun

# Terminal 2: Frontend
cd frontend && npm start
```

### Running Tests
```bash
# Run all feature tests
npx cucumber-js

# Run specific feature
npx cucumber-js features/product_navigation.feature

# Run with detailed output
npx cucumber-js --format progress-bar --format html:cucumber-report.html
```

## Test Structure

### Feature File (`product_navigation.feature`)
- **Background**: Sets up application state before each scenario
- **Rules**: Define business rules for product display
- **Scenarios**: Individual test cases with Given-When-Then steps
- **Examples**: Data-driven testing for multiple products

### Step Definitions (`product_navigation_steps.js`)
- **Given**: Setup steps (navigate to pages, verify application state)
- **When**: Action steps (click buttons, interact with elements)
- **Then**: Verification steps (check prices, verify navigation)

## Key Test Cases

### 1. Price Verification Test
```gherkin
Scenario: Customer verifies specific Samsung product price
  Given I am on the product list page
  When I see the product "Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM"
  And I click "Ver detalle" for that product
  Then I should be navigated to "/product/1"
  And I should see the exact price "1853861"
```

This scenario documents the exact test we performed to verify the price "1853861" is displayed correctly.

### 2. Shopping Cart Test
```gherkin
Scenario: Customer can add product to shopping cart
  Given I am on the product detail page for "Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM"
  When I click "Agregar al carrito"
  Then the shopping cart should be displayed
  And the product should be added to the cart
  And the cart should show the correct price "1853861"
```

This tests the shopping cart functionality we implemented.

## Benefits of Gherkin Documentation

1. **Human-Readable**: Business stakeholders can understand test requirements
2. **Living Documentation**: Tests serve as up-to-date documentation
3. **Behavior-Driven Development**: Focuses on user behavior and business value
4. **Automation Ready**: Step definitions can be implemented for automated testing
5. **Collaboration**: Bridges communication between technical and non-technical team members

## Integration with CI/CD

These Gherkin tests can be integrated into your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Run Gherkin Tests
  run: |
    npm install
    npx cucumber-js --format progress-bar --format html:cucumber-report.html
  env:
    CI: true
```

## Reports

The tests generate HTML reports showing:
- Test execution results
- Pass/fail status for each scenario
- Step-by-step execution details
- Screenshots (if configured)

## Next Steps

1. **Add Data Test IDs**: Add `data-testid` attributes to React components for better test selectors
2. **Implement Visual Testing**: Add screenshot comparison for UI regression testing
3. **API Testing**: Extend tests to verify backend API responses
4. **Performance Testing**: Add scenarios for testing application performance
5. **Accessibility Testing**: Include accessibility verification steps

## References

- [Cucumber Gherkin Reference](https://cucumber.io/docs/gherkin/reference)
- [Cucumber.js Documentation](https://github.com/cucumber/cucumber-js)
- [Behavior-Driven Development](https://cucumber.io/docs/bdd/) 