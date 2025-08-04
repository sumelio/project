const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const axios = require('axios');

// Background steps
Given('the marketplace application is running', async function() {
  // Verify frontend is accessible
  const frontendResponse = await axios.get('http://localhost:3000/');
  expect(frontendResponse.status).to.equal(200);
});

Given('the backend API is accessible', async function() {
  // Verify backend is accessible
  const backendResponse = await axios.get('http://localhost:8080/product');
  expect(backendResponse.status).to.equal(200);
});

Given('product data is loaded in the system', async function() {
  // Verify product data exists
  const products = await axios.get('http://localhost:8080/product');
  expect(products.data).to.be.an('array');
  expect(products.data.length).to.be.greaterThan(0);
});

// Product list steps
Given('I am on the product list page', async function() {
  // Navigate to product list page
  this.currentPage = 'product-list';
  this.page = await this.browser.newPage();
  await this.page.goto('http://localhost:3000/');
});

When('I see the product {string}', async function(productTitle) {
  // Wait for product to be visible
  await this.page.waitForSelector(`text=${productTitle}`);
  this.selectedProduct = productTitle;
});

When('I click {string} for that product', async function(buttonText) {
  // Click the "Ver detalle" button for the selected product
  const button = await this.page.$(`text=${buttonText}`);
  await button.click();
});

// Product detail steps
Given('I am on the product detail page for {string}', async function(productTitle) {
  // Navigate directly to product detail page
  this.currentPage = 'product-detail';
  this.page = await this.browser.newPage();
  
  // Extract product ID from title (in real implementation, you'd have a mapping)
  const productId = productTitle.includes('A55') ? '1' : '2';
  await this.page.goto(`http://localhost:3000/product/${productId}`);
});

Then('I should be navigated to the product detail page', async function() {
  // Verify URL contains product path
  const currentUrl = this.page.url();
  expect(currentUrl).to.include('/product/');
});

Then('I should be navigated to {string}', async function(expectedPath) {
  // Verify specific URL
  const currentUrl = this.page.url();
  expect(currentUrl).to.include(expectedPath);
});

Then('I should see the product price {string}', async function(expectedPrice) {
  // Verify price is displayed
  const priceElement = await this.page.$('[data-testid="product-price"]');
  const priceText = await priceElement.textContent();
  expect(priceText).to.include(expectedPrice);
});

Then('I should see the exact price {string}', async function(expectedPrice) {
  // Verify exact price match
  const priceElement = await this.page.$('[data-testid="product-price"]');
  const priceText = await priceElement.textContent();
  expect(priceText.trim()).to.equal(expectedPrice);
});

Then('I should see the product title {string}', async function(expectedTitle) {
  // Verify product title
  const titleElement = await this.page.$('[data-testid="product-title"]');
  const titleText = await titleElement.textContent();
  expect(titleText).to.include(expectedTitle);
});

Then('I should see product images', async function() {
  // Verify product images are displayed
  const images = await this.page.$$('img[alt*="product"]');
  expect(images.length).to.be.greaterThan(0);
});

Then('I should see seller information', async function() {
  // Verify seller information is displayed
  const sellerElement = await this.page.$('[data-testid="seller-info"]');
  expect(sellerElement).to.not.be.null;
});

Then('I should see the product description', async function() {
  // Verify product description is displayed
  const descriptionElement = await this.page.$('[data-testid="product-description"]');
  expect(descriptionElement).to.not.be.null;
});

Then('I should see payment methods available', async function() {
  // Verify payment methods are displayed
  const paymentElement = await this.page.$('[data-testid="payment-methods"]');
  expect(paymentElement).to.not.be.null;
});

Then('I should see seller reputation information', async function() {
  // Verify seller reputation is displayed
  const reputationElement = await this.page.$('[data-testid="seller-reputation"]');
  expect(reputationElement).to.not.be.null;
});

// Shopping cart steps
When('I click {string}', async function(buttonText) {
  // Click the specified button
  const button = await this.page.$(`text=${buttonText}`);
  await button.click();
});

Then('the shopping cart should be displayed', async function() {
  // Verify shopping cart is visible
  const cartElement = await this.page.$('[data-testid="shopping-cart"]');
  expect(cartElement).to.not.be.null;
});

Then('the product should be added to the cart', async function() {
  // Verify product appears in cart
  const cartItems = await this.page.$$('[data-testid="cart-item"]');
  expect(cartItems.length).to.be.greaterThan(0);
});

Then('the cart should show the correct price {string}', async function(expectedPrice) {
  // Verify cart shows correct price
  const cartPriceElement = await this.page.$('[data-testid="cart-total"]');
  const cartPriceText = await cartPriceElement.textContent();
  expect(cartPriceText).to.include(expectedPrice);
});

// Navigation steps
When('I navigate back to the product list', async function() {
  // Navigate back to product list
  await this.page.goto('http://localhost:3000/');
});

Then('I should see all available products', async function() {
  // Verify product list is displayed
  const products = await this.page.$$('[data-testid="product-item"]');
  expect(products.length).to.be.greaterThan(0);
});

Then('I should be able to select different products', async function() {
  // Verify multiple products are available for selection
  const detailButtons = await this.page.$$('text="Ver detalle"');
  expect(detailButtons.length).to.be.greaterThan(1);
});

// Product list verification steps
Then('I should see product titles', async function() {
  // Verify product titles are displayed
  const titles = await this.page.$$('[data-testid="product-title"]');
  expect(titles.length).to.be.greaterThan(0);
});

Then('I should see product prices', async function() {
  // Verify product prices are displayed
  const prices = await this.page.$$('[data-testid="product-price"]');
  expect(prices.length).to.be.greaterThan(0);
});

Then('I should see {string} buttons for each product', async function(buttonText) {
  // Verify detail buttons are present
  const buttons = await this.page.$$(`text="${buttonText}"`);
  expect(buttons.length).to.be.greaterThan(0);
});

// Product detail page verification steps
Given('I am on the product detail page for any product', async function() {
  // Navigate to any product detail page
  this.currentPage = 'product-detail';
  this.page = await this.browser.newPage();
  await this.page.goto('http://localhost:3000/product/1');
});

Then('I should see product images with thumbnail navigation', async function() {
  // Verify image gallery with thumbnails
  const mainImage = await this.page.$('[data-testid="main-image"]');
  const thumbnails = await this.page.$$('[data-testid="thumbnail"]');
  expect(mainImage).to.not.be.null;
  expect(thumbnails.length).to.be.greaterThan(0);
});

Then('I should see stock availability', async function() {
  // Verify stock information is displayed
  const stockElement = await this.page.$('[data-testid="stock-info"]');
  expect(stockElement).to.not.be.null;
});

Then('I should see {string} and {string} buttons', async function(button1, button2) {
  // Verify both purchase buttons are present
  const buyButton = await this.page.$(`text="${button1}"`);
  const cartButton = await this.page.$(`text="${button2}"`);
  expect(buyButton).to.not.be.null;
  expect(cartButton).to.not.be.null;
}); 