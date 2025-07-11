package com.marketplace;

import com.marketplace.domain.Metrics;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class MetricsTest {

    @Test
    void testConstructorAndGetters() {
        Metrics metrics = new Metrics("95%", "98%", "92%");
        
        assertEquals("95%", metrics.getSales());
        assertEquals("98%", metrics.getService());
        assertEquals("92%", metrics.getDelivery());
    }

    @Test
    void testDefaultConstructor() {
        Metrics metrics = new Metrics();
        assertNotNull(metrics);
    }

    @Test
    void testSetters() {
        Metrics metrics = new Metrics();
        metrics.setSales("90%");
        metrics.setService("95%");
        metrics.setDelivery("88%");

        assertEquals("90%", metrics.getSales());
        assertEquals("95%", metrics.getService());
        assertEquals("88%", metrics.getDelivery());
    }

    @Test
    void testSettersWithNullValues() {
        Metrics metrics = new Metrics();
        metrics.setSales(null);
        metrics.setService(null);
        metrics.setDelivery(null);

        assertEquals(null, metrics.getSales());
        assertEquals(null, metrics.getService());
        assertEquals(null, metrics.getDelivery());
    }

    @Test
    void testConstructorWithVariousValues() {
        Metrics metrics = new Metrics("100%", "85%", "77%");
        
        assertEquals("100%", metrics.getSales());
        assertEquals("85%", metrics.getService());
        assertEquals("77%", metrics.getDelivery());
    }
} 