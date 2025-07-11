package com.marketplace;

import com.marketplace.domain.SellerInformation;
import com.marketplace.domain.Reputation;
import com.marketplace.domain.Metrics;
import com.marketplace.domain.PurchaseOptions;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class SellerInformationTest {

    @Test
    void testConstructorAndGetters() {
        Reputation reputation = new Reputation("Gold", "Excellent seller");
        Metrics metrics = new Metrics("95%", "98%", "92%");
        PurchaseOptions purchaseOptions = new PurchaseOptions(1299L);
        
        SellerInformation sellerInfo = new SellerInformation("Samsung Store", "1250", reputation, metrics, purchaseOptions);
        
        assertEquals("Samsung Store", sellerInfo.getName());
        assertEquals("1250", sellerInfo.getProductsCount());
        assertEquals(reputation, sellerInfo.getReputation());
        assertEquals(metrics, sellerInfo.getMetrics());
        assertEquals(purchaseOptions, sellerInfo.getPurchaseOptions());
    }

    @Test
    void testDefaultConstructor() {
        SellerInformation sellerInfo = new SellerInformation();
        assertNotNull(sellerInfo);
    }

    @Test
    void testSetters() {
        SellerInformation sellerInfo = new SellerInformation();
        Reputation reputation = new Reputation("Platinum", "Outstanding seller");
        Metrics metrics = new Metrics("99%", "97%", "95%");
        PurchaseOptions purchaseOptions = new PurchaseOptions(2500L);
        
        sellerInfo.setName("Apple Store");
        sellerInfo.setProductsCount("2500");
        sellerInfo.setReputation(reputation);
        sellerInfo.setMetrics(metrics);
        sellerInfo.setPurchaseOptions(purchaseOptions);

        assertEquals("Apple Store", sellerInfo.getName());
        assertEquals("2500", sellerInfo.getProductsCount());
        assertEquals(reputation, sellerInfo.getReputation());
        assertEquals(metrics, sellerInfo.getMetrics());
        assertEquals(purchaseOptions, sellerInfo.getPurchaseOptions());
    }

    @Test
    void testSettersWithNullValues() {
        SellerInformation sellerInfo = new SellerInformation();
        sellerInfo.setName(null);
        sellerInfo.setProductsCount(null);
        sellerInfo.setReputation(null);
        sellerInfo.setMetrics(null);
        sellerInfo.setPurchaseOptions(null);

        assertEquals(null, sellerInfo.getName());
        assertEquals(null, sellerInfo.getProductsCount());
        assertEquals(null, sellerInfo.getReputation());
        assertEquals(null, sellerInfo.getMetrics());
        assertEquals(null, sellerInfo.getPurchaseOptions());
    }

    @Test
    void testConstructorWithComplexObjects() {
        Reputation reputation = new Reputation("Silver", "Good seller");
        Metrics metrics = new Metrics("85%", "90%", "88%");
        PurchaseOptions purchaseOptions = new PurchaseOptions(500L);
        
        SellerInformation sellerInfo = new SellerInformation("Electronics Plus", "750", reputation, metrics, purchaseOptions);
        
        assertEquals("Electronics Plus", sellerInfo.getName());
        assertEquals("750", sellerInfo.getProductsCount());
        assertEquals("Silver", sellerInfo.getReputation().getLevel());
        assertEquals("85%", sellerInfo.getMetrics().getSales());
        assertEquals(500L, sellerInfo.getPurchaseOptions().getPrice());
    }

    @Test
    void testGetNameWithNullReputation() {
        SellerInformation sellerInfo = new SellerInformation();
        sellerInfo.setName("Test Seller");
        
        assertEquals("Test Seller", sellerInfo.getName());
    }
} 