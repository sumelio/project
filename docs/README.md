# Documentation

This directory contains comprehensive documentation for the Marketplace project, including Gherkin test specifications and implementation guides.

## 📁 Directory Structure

```
docs/
├── README.md                    # This file - main documentation index
├── README_es.md                 # Spanish version of documentation
├── cucumber.js                  # Cucumber configuration
└── features/                    # Gherkin test specifications
    ├── README.md               # Gherkin test documentation
    ├── product_navigation.feature  # Product navigation test scenarios (English)
    ├── product_navigation_es.feature  # Product navigation test scenarios (Spanish)
    └── step_definitions/       # Step definition implementations
        ├── product_navigation_steps.js
        └── product_navigation_steps_es.js
```

## 🧪 Gherkin Test Documentation

The `features/` directory contains Behavior-Driven Development (BDD) test specifications using the [Cucumber Gherkin syntax](https://cucumber.io/docs/gherkin/reference).

### Language Versions

#### English
- `product_navigation.feature` - Test scenarios in English
- `product_navigation_steps.js` - Step definitions in English

#### Spanish
- `product_navigation_es.feature` - Test scenarios in Spanish
- `product_navigation_steps_es.js` - Step definitions in Spanish

### Running Tests in Different Languages

```bash
# Run tests in English
npx cucumber-js features/product_navigation.feature

# Run tests in Spanish
npx cucumber-js features/product_navigation_es.feature

# Run all tests (both languages)
npx cucumber-js
```

### Key Test Scenarios

1. **Product Navigation Test** - Documents the user journey from product list to detail pages
2. **Price Verification Test** - Specifically tests the Samsung Galaxy A55 price "1853861"
3. **Shopping Cart Test** - Tests the "Agregar al carrito" functionality
4. **Complete User Experience** - End-to-end user workflows

### Running the Tests

```bash
# Navigate to docs directory
cd docs

# Install dependencies (if not already installed)
npm install --save-dev @cucumber/cucumber @babel/register chai axios puppeteer

# Run all Gherkin tests
npx cucumber-js

# Run specific feature in English
npx cucumber-js features/product_navigation.feature

# Run specific feature in Spanish
npx cucumber-js features/product_navigation_es.feature

# Generate HTML report
npx cucumber-js --format progress-bar --format html:cucumber-report.html
```

### Prerequisites

Before running the tests, ensure:
1. Backend API is running on `http://localhost:8080`
2. Frontend application is running on `http://localhost:3000`
3. Product data is loaded in the system

## 📋 Test Documentation Benefits

- **Human-Readable**: Business stakeholders can understand test requirements
- **Living Documentation**: Tests serve as up-to-date documentation
- **Automation Ready**: Step definitions can be implemented for automated testing
- **Collaboration**: Bridges communication between technical and non-technical teams
- **Regression Testing**: Ensures consistent behavior across application updates

## 🔗 Related Documentation

- [Main Project README](../README.md) - Project overview and setup instructions
- [Backend Documentation](../backend/msProduct/README.md) - Backend API documentation
- [Frontend Documentation](../frontend/README.md) - Frontend application documentation

## 🚀 Integration with CI/CD

These Gherkin tests can be integrated into your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Run Gherkin Tests
  run: |
    cd docs
    npm install
    npx cucumber-js --format progress-bar --format html:cucumber-report.html
  env:
    CI: true
```

## 📊 Test Reports

The tests generate comprehensive reports including:
- Test execution results
- Pass/fail status for each scenario
- Step-by-step execution details
- HTML reports for detailed analysis

## 🎯 Next Steps

1. **Add Data Test IDs**: Add `data-testid` attributes to React components
2. **Implement Visual Testing**: Add screenshot comparison for UI regression testing
3. **API Testing**: Extend tests to verify backend API responses
4. **Performance Testing**: Add scenarios for testing application performance
5. **Accessibility Testing**: Include accessibility verification steps

## 📚 References

- [Cucumber Gherkin Reference](https://cucumber.io/docs/gherkin/reference)
- [Behavior-Driven Development](https://cucumber.io/docs/bdd/)
- [Cucumber.js Documentation](https://github.com/cucumber/cucumber-js) 