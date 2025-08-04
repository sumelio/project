const { Dado, Cuando, Entonces } = require('@cucumber/cucumber');
const { expect } = require('chai');
const axios = require('axios');

// Pasos de Antecedentes
Dado('que la aplicación del marketplace está ejecutándose', async function() {
  // Verificar que el frontend es accesible
  const frontendResponse = await axios.get('http://localhost:3000/');
  expect(frontendResponse.status).to.equal(200);
});

Dado('la API del backend es accesible', async function() {
  // Verificar que el backend es accesible
  const backendResponse = await axios.get('http://localhost:8080/product');
  expect(backendResponse.status).to.equal(200);
});

Dado('los datos del producto están cargados en el sistema', async function() {
  // Verificar que existen datos de productos
  const products = await axios.get('http://localhost:8080/product');
  expect(products.data).to.be.an('array');
  expect(products.data.length).to.be.greaterThan(0);
});

// Pasos de lista de productos
Dado('que estoy en la página de lista de productos', async function() {
  // Navegar a la página de lista de productos
  this.currentPage = 'lista-productos';
  this.page = await this.browser.newPage();
  await this.page.goto('http://localhost:3000/');
});

Cuando('veo el producto {string}', async function(tituloProducto) {
  // Esperar a que el producto sea visible
  await this.page.waitForSelector(`text=${tituloProducto}`);
  this.productoSeleccionado = tituloProducto;
});

Cuando('hago clic en {string} para ese producto', async function(textoBoton) {
  // Hacer clic en el botón "Ver detalle" para el producto seleccionado
  const boton = await this.page.$(`text=${textoBoton}`);
  await boton.click();
});

// Pasos de detalles del producto
Dado('que estoy en la página de detalles del producto para {string}', async function(tituloProducto) {
  // Navegar directamente a la página de detalles del producto
  this.currentPage = 'detalle-producto';
  this.page = await this.browser.newPage();
  
  // Extraer ID del producto del título (en implementación real, tendrías un mapeo)
  const productId = tituloProducto.includes('A55') ? '1' : '2';
  await this.page.goto(`http://localhost:3000/product/${productId}`);
});

Entonces('debería ser navegado a la página de detalles del producto', async function() {
  // Verificar que la URL contiene la ruta del producto
  const currentUrl = this.page.url();
  expect(currentUrl).to.include('/product/');
});

Entonces('debería ser navegado a {string}', async function(rutaEsperada) {
  // Verificar URL específica
  const currentUrl = this.page.url();
  expect(currentUrl).to.include(rutaEsperada);
});

Entonces('debería ver el precio del producto {string}', async function(precioEsperado) {
  // Verificar que el precio se muestra
  const elementoPrecio = await this.page.$('[data-testid="product-price"]');
  const textoPrecio = await elementoPrecio.textContent();
  expect(textoPrecio).to.include(precioEsperado);
});

Entonces('debería ver el precio exacto {string}', async function(precioEsperado) {
  // Verificar coincidencia exacta del precio
  const elementoPrecio = await this.page.$('[data-testid="product-price"]');
  const textoPrecio = await elementoPrecio.textContent();
  expect(textoPrecio.trim()).to.equal(precioEsperado);
});

Entonces('debería ver el título del producto {string}', async function(tituloEsperado) {
  // Verificar título del producto
  const elementoTitulo = await this.page.$('[data-testid="product-title"]');
  const textoTitulo = await elementoTitulo.textContent();
  expect(textoTitulo).to.include(tituloEsperado);
});

Entonces('debería ver imágenes del producto', async function() {
  // Verificar que se muestran imágenes del producto
  const imagenes = await this.page.$$('img[alt*="product"]');
  expect(imagenes.length).to.be.greaterThan(0);
});

Entonces('debería ver información del vendedor', async function() {
  // Verificar que se muestra información del vendedor
  const elementoVendedor = await this.page.$('[data-testid="seller-info"]');
  expect(elementoVendedor).to.not.be.null;
});

Entonces('debería ver la descripción del producto', async function() {
  // Verificar que se muestra la descripción del producto
  const elementoDescripcion = await this.page.$('[data-testid="product-description"]');
  expect(elementoDescripcion).to.not.be.null;
});

Entonces('debería ver métodos de pago disponibles', async function() {
  // Verificar que se muestran métodos de pago
  const elementoPago = await this.page.$('[data-testid="payment-methods"]');
  expect(elementoPago).to.not.be.null;
});

Entonces('debería ver información de reputación del vendedor', async function() {
  // Verificar que se muestra la reputación del vendedor
  const elementoReputacion = await this.page.$('[data-testid="seller-reputation"]');
  expect(elementoReputacion).to.not.be.null;
});

// Pasos del carrito de compras
Cuando('hago clic en {string}', async function(textoBoton) {
  // Hacer clic en el botón especificado
  const boton = await this.page.$(`text=${textoBoton}`);
  await boton.click();
});

Entonces('el carrito de compras debería ser mostrado', async function() {
  // Verificar que el carrito de compras es visible
  const elementoCarrito = await this.page.$('[data-testid="shopping-cart"]');
  expect(elementoCarrito).to.not.be.null;
});

Entonces('el producto debería ser agregado al carrito', async function() {
  // Verificar que el producto aparece en el carrito
  const elementosCarrito = await this.page.$$('[data-testid="cart-item"]');
  expect(elementosCarrito.length).to.be.greaterThan(0);
});

Entonces('el carrito debería mostrar el precio correcto {string}', async function(precioEsperado) {
  // Verificar que el carrito muestra el precio correcto
  const elementoPrecioCarrito = await this.page.$('[data-testid="cart-total"]');
  const textoPrecioCarrito = await elementoPrecioCarrito.textContent();
  expect(textoPrecioCarrito).to.include(precioEsperado);
});

// Pasos de navegación
Cuando('navego de regreso a la lista de productos', async function() {
  // Navegar de regreso a la lista de productos
  await this.page.goto('http://localhost:3000/');
});

Entonces('debería ver todos los productos disponibles', async function() {
  // Verificar que se muestra la lista de productos
  const productos = await this.page.$$('[data-testid="product-item"]');
  expect(productos.length).to.be.greaterThan(0);
});

Entonces('debería poder seleccionar diferentes productos', async function() {
  // Verificar que múltiples productos están disponibles para selección
  const botonesDetalle = await this.page.$$('text="Ver detalle"');
  expect(botonesDetalle.length).to.be.greaterThan(1);
});

// Pasos de verificación de lista de productos
Entonces('debería ver títulos de productos', async function() {
  // Verificar que se muestran títulos de productos
  const titulos = await this.page.$$('[data-testid="product-title"]');
  expect(titulos.length).to.be.greaterThan(0);
});

Entonces('debería ver precios de productos', async function() {
  // Verificar que se muestran precios de productos
  const precios = await this.page.$$('[data-testid="product-price"]');
  expect(precios.length).to.be.greaterThan(0);
});

Entonces('debería ver botones {string} para cada producto', async function(textoBoton) {
  // Verificar que están presentes los botones de detalle
  const botones = await this.page.$$(`text="${textoBoton}"`);
  expect(botones.length).to.be.greaterThan(0);
});

// Pasos de verificación de página de detalles del producto
Dado('que estoy en la página de detalles del producto para cualquier producto', async function() {
  // Navegar a cualquier página de detalles del producto
  this.currentPage = 'detalle-producto';
  this.page = await this.browser.newPage();
  await this.page.goto('http://localhost:3000/product/1');
});

Entonces('debería ver imágenes del producto con navegación de miniaturas', async function() {
  // Verificar galería de imágenes con miniaturas
  const imagenPrincipal = await this.page.$('[data-testid="main-image"]');
  const miniaturas = await this.page.$$('[data-testid="thumbnail"]');
  expect(imagenPrincipal).to.not.be.null;
  expect(miniaturas.length).to.be.greaterThan(0);
});

Entonces('debería ver disponibilidad de stock', async function() {
  // Verificar que se muestra información de stock
  const elementoStock = await this.page.$('[data-testid="stock-info"]');
  expect(elementoStock).to.not.be.null;
});

Entonces('debería ver {string} y {string} botones', async function(boton1, boton2) {
  // Verificar que ambos botones de compra están presentes
  const botonComprar = await this.page.$(`text="${boton1}"`);
  const botonCarrito = await this.page.$(`text="${boton2}"`);
  expect(botonComprar).to.not.be.null;
  expect(botonCarrito).to.not.be.null;
}); 