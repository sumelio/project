package com.marketplace;

import com.marketplace.domain.PurchaseOptions;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class PurchaseOptionsTest {

    @Test
    void testConstructorAndGetters() {
        PurchaseOptions purchaseOptions = new PurchaseOptions(1299L);
        
        assertEquals(1299L, purchaseOptions.getPrice());
    }

    @Test
    void testDefaultConstructor() {
        PurchaseOptions purchaseOptions = new PurchaseOptions();
        assertNotNull(purchaseOptions);
    }

    @Test
    void testSetters() {
        PurchaseOptions purchaseOptions = new PurchaseOptions();
        purchaseOptions.setPrice(2500L);

        assertEquals(2500L, purchaseOptions.getPrice());
    }

    @Test
    void testSettersWithNullValue() {
        PurchaseOptions purchaseOptions = new PurchaseOptions();
        purchaseOptions.setPrice(null);

        assertEquals(null, purchaseOptions.getPrice());
    }

    @Test
    void testConstructorWithZeroPrice() {
        PurchaseOptions purchaseOptions = new PurchaseOptions(0L);
        
        assertEquals(0L, purchaseOptions.getPrice());
    }

    @Test
    void testConstructorWithLargePrice() {
        PurchaseOptions purchaseOptions = new PurchaseOptions(999999999L);
        
        assertEquals(999999999L, purchaseOptions.getPrice());
    }

    @Test
    void testSetterWithNegativePrice() {
        PurchaseOptions purchaseOptions = new PurchaseOptions();
        purchaseOptions.setPrice(-100L);

        assertEquals(-100L, purchaseOptions.getPrice());
    }
} 