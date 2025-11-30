package com.marketplace;

import com.marketplace.application.ProductServiceImpl;
import com.marketplace.domain.AdditionalDetails;
import com.marketplace.domain.Product;
import com.marketplace.domain.ProductRepository;
import com.marketplace.domain.SellerInformation;
import com.marketplace.domain.exceptions.ProductNotFoundException;
import com.marketplace.domain.exceptions.ValidationException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceImplTest {
    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    private Product product;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        product = createValidProduct();
    }

    private Product createValidProduct() {
        Product p = new Product();
        p.setId("1");
        p.setTitle("Test Product");
        p.setDescription("Test Description");
        p.setPrice("100.00");
        p.setPaymentMethods(Arrays.asList("credit_card", "debit_card"));

        SellerInformation seller = new SellerInformation();
        seller.setSellerName("Test Seller");
        p.setSellerInformation(seller);

        AdditionalDetails details = new AdditionalDetails();
        details.setCondition("new");
        p.setAdditionalDetails(details);

        return p;
    }

    @Test
    void testGetAllProducts() {
        when(productRepository.findAll()).thenReturn(Arrays.asList(product));
        List<Product> products = productService.getAllProducts();
        assertEquals(1, products.size());
        assertEquals("1", products.get(0).getId());
    }

    @Test
    void testGetProductById() {
        when(productRepository.findById("1")).thenReturn(product);
        Product found = productService.getProductById("1");
        assertNotNull(found);
        assertEquals("1", found.getId());
    }

    @Test
    void testGetProductByIdNotFound() {
        when(productRepository.findById("999")).thenReturn(null);
        assertThrows(ProductNotFoundException.class, () -> productService.getProductById("999"));
    }

    @Test
    void testGetProductByIdWithNullId() {
        assertThrows(IllegalArgumentException.class, () -> productService.getProductById(null));
    }

    @Test
    void testCreateProduct() {
        when(productRepository.save(product)).thenReturn(product);
        Product created = productService.createProduct(product);
        assertNotNull(created);
        assertEquals("1", created.getId());
    }

    @Test
    void testCreateProductWithInvalidData() {
        Product invalidProduct = new Product();
        invalidProduct.setId("1");
        // Missing other required fields

        assertThrows(ValidationException.class, () -> productService.createProduct(invalidProduct));
    }

    @Test
    void testUpdateProduct() {
        when(productRepository.findById("1")).thenReturn(product);
        when(productRepository.update("1", product)).thenReturn(product);
        Product updated = productService.updateProduct("1", product);
        assertNotNull(updated);
        assertEquals("1", updated.getId());
    }

    @Test
    void testUpdateProductNotFound() {
        when(productRepository.findById("999")).thenReturn(null);
        assertThrows(ProductNotFoundException.class, () -> productService.updateProduct("999", product));
    }

    @Test
    void testDeleteProduct() {
        when(productRepository.findById("1")).thenReturn(product);
        doNothing().when(productRepository).delete("1");
        assertDoesNotThrow(() -> productService.deleteProduct("1"));
        verify(productRepository, times(1)).delete("1");
    }

    @Test
    void testDeleteProductNotFound() {
        when(productRepository.findById("999")).thenReturn(null);
        assertThrows(ProductNotFoundException.class, () -> productService.deleteProduct("999"));
    }
} 