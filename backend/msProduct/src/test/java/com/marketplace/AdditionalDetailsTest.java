package com.marketplace;

import com.marketplace.domain.AdditionalDetails;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class AdditionalDetailsTest {

    @Test
    void testConstructorAndGetters() {
        AdditionalDetails details = new AdditionalDetails("4.5", "100 reviews", "50");
        assertEquals("4.5", details.getRatings());
        assertEquals("100 reviews", details.getReviews());
        assertEquals("50", details.getAvailableStock());
    }

    @Test
    void testSetters() {
        AdditionalDetails details = new AdditionalDetails();
        details.setRatings("4.0");
        details.setReviews("50 reviews");
        details.setAvailableStock("25");

        assertEquals("4.0", details.getRatings());
        assertEquals("50 reviews", details.getReviews());
        assertEquals("25", details.getAvailableStock());
    }
} 