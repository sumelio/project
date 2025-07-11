package com.marketplace;

import com.marketplace.domain.Reputation;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class ReputationTest {

    @Test
    void testConstructorAndGetters() {
        Reputation reputation = new Reputation("Gold", "Excellent seller");
        
        assertEquals("Gold", reputation.getLevel());
        assertEquals("Excellent seller", reputation.getDescription());
    }

    @Test
    void testDefaultConstructor() {
        Reputation reputation = new Reputation();
        assertNotNull(reputation);
    }

    @Test
    void testSetters() {
        Reputation reputation = new Reputation();
        reputation.setLevel("Platinum");
        reputation.setDescription("Outstanding seller with perfect ratings");

        assertEquals("Platinum", reputation.getLevel());
        assertEquals("Outstanding seller with perfect ratings", reputation.getDescription());
    }

    @Test
    void testSettersWithNullValues() {
        Reputation reputation = new Reputation();
        reputation.setLevel(null);
        reputation.setDescription(null);

        assertEquals(null, reputation.getLevel());
        assertEquals(null, reputation.getDescription());
    }

    @Test
    void testConstructorWithVariousLevels() {
        Reputation silverReputation = new Reputation("Silver", "Good seller");
        Reputation bronzeReputation = new Reputation("Bronze", "New seller");
        
        assertEquals("Silver", silverReputation.getLevel());
        assertEquals("Good seller", silverReputation.getDescription());
        assertEquals("Bronze", bronzeReputation.getLevel());
        assertEquals("New seller", bronzeReputation.getDescription());
    }

    @Test
    void testSettersWithEmptyValues() {
        Reputation reputation = new Reputation();
        reputation.setLevel("");
        reputation.setDescription("");

        assertEquals("", reputation.getLevel());
        assertEquals("", reputation.getDescription());
    }

    @Test
    void testConstructorWithEmptyValues() {
        Reputation reputation = new Reputation("", "");
        
        assertEquals("", reputation.getLevel());
        assertEquals("", reputation.getDescription());
    }
} 