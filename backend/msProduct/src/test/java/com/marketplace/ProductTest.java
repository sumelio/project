package com.marketplace;

import com.marketplace.domain.AdditionalDetails;
import com.marketplace.domain.Product;
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

        Product product = new Product("1", images, "Test Product", "Description", "100.00", paymentMethods, "Seller", details);

        assertEquals("1", product.getId());
        assertEquals(images, product.getImages());
        assertEquals("Test Product", product.getTitle());
        assertEquals("Description", product.getDescription());
        assertEquals("100.00", product.getPrice());
        assertEquals(paymentMethods, product.getPaymentMethods());
        assertEquals("Seller", product.getSellerInformation());
        assertEquals(details, product.getAdditionalDetails());
    }

    @Test
    void testSetters() {
        Product product = new Product();
        product.setId("2");
        product.setTitle("Another Product");
        // ... test other setters if needed

        assertEquals("2", product.getId());
        assertEquals("Another Product", product.getTitle());
    }
} 