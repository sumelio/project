package com.marketplace;

import com.marketplace.application.ProductServiceImpl;
import com.marketplace.domain.Product;
import com.marketplace.domain.ProductRepository;
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
        product = new Product();
        product.setId("1");
        product.setTitle("Test Product");
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
    void testCreateProduct() {
        when(productRepository.save(product)).thenReturn(product);
        Product created = productService.createProduct(product);
        assertNotNull(created);
        assertEquals("1", created.getId());
    }

    @Test
    void testUpdateProduct() {
        when(productRepository.update("1", product)).thenReturn(product);
        Product updated = productService.updateProduct("1", product);
        assertNotNull(updated);
        assertEquals("1", updated.getId());
    }

    @Test
    void testDeleteProduct() {
        doNothing().when(productRepository).delete("1");
        assertDoesNotThrow(() -> productService.deleteProduct("1"));
        verify(productRepository, times(1)).delete("1");
    }
} 