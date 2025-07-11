package com.marketplace;

import com.marketplace.domain.AdditionalDetails;
import com.marketplace.domain.Product;
import com.marketplace.domain.SellerInformation;
import com.marketplace.domain.Reputation;
import com.marketplace.domain.Metrics;
import com.marketplace.domain.PurchaseOptions;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class ProductTest {

    @Test
    void testFullConstructorAndGetters() {
        List<String> images = Arrays.asList("img1.jpg", "img2.jpg");
        List<String> paymentMethods = Arrays.asList("Card", "Cash");
        AdditionalDetails details = new AdditionalDetails("4.5", "100 reviews", "50");
        
        // Create proper SellerInformation object
        Reputation reputation = new Reputation("Gold", "Excellent seller");
        Metrics metrics = new Metrics("95%", "98%", "92%");
        PurchaseOptions purchaseOptions = new PurchaseOptions(10000L);
        SellerInformation sellerInfo = new SellerInformation("Test Seller", "1250", reputation, metrics, purchaseOptions);

        Product product = new Product("1", images, "Test Product", "Description", "100.00", paymentMethods, sellerInfo, details);

        assertEquals("1", product.getId());
        assertEquals(images, product.getImages());
        assertEquals("Test Product", product.getTitle());
        assertEquals("Description", product.getDescription());
        assertEquals("100.00", product.getPrice());
        assertEquals(paymentMethods, product.getPaymentMethods());
        assertEquals(sellerInfo, product.getSellerInformation());
        assertEquals("Test Seller", product.getSellerInformation().getName());
        assertEquals(details, product.getAdditionalDetails());
    }

    @Test
    void testSetters() {
        Product product = new Product();
        product.setId("2");
        product.setTitle("Another Product");
        product.setDescription("Another Description");
        product.setPrice("200.00");

        assertEquals("2", product.getId());
        assertEquals("Another Product", product.getTitle());
        assertEquals("Another Description", product.getDescription());
        assertEquals("200.00", product.getPrice());
    }

    @Test
    void testDefaultConstructor() {
        Product product = new Product();
        assertNotNull(product);
        // Default constructor should create an empty product
        assertEquals(null, product.getId());
        assertEquals(null, product.getTitle());
    }
} 