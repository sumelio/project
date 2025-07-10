package com.marketplace;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marketplace.application.ProductService;
import com.marketplace.domain.Product;
import com.marketplace.infrastructure.ProductController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
class ProductControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    private Product product;
    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        product = new Product();
        product.setId("1");
        product.setTitle("Test Product");
    }

    @Test
    void testGetAllProducts() throws Exception {
        when(productService.getAllProducts()).thenReturn(Collections.singletonList(product));
        mockMvc.perform(get("/product"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("1"));
    }

    @Test
    void testGetProductById() throws Exception {
        when(productService.getProductById("1")).thenReturn(product);
        mockMvc.perform(get("/product/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"));
    }

    @Test
    void testDeleteProduct() throws Exception {
        doNothing().when(productService).deleteProduct("1");
        mockMvc.perform(delete("/product/1"))
                .andExpect(status().isOk());
    }
} 