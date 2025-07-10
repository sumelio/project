// The package declaration is correct for Java source files under src/main/java/com/marketplace/domain
// If your IDE shows a package mismatch, ensure your source root is set to src/main/java
package com.marketplace.domain;

public class AdditionalDetails {
    private String ratings;
    private String reviews;
    private String availableStock;

    public AdditionalDetails() {}

    public AdditionalDetails(String ratings, String reviews, String availableStock) {
        this.ratings = ratings;
        this.reviews = reviews;
        this.availableStock = availableStock;
    }

    public String getRatings() { return ratings; }
    public void setRatings(String ratings) { this.ratings = ratings; }

    public String getReviews() { return reviews; }
    public void setReviews(String reviews) { this.reviews = reviews; }

    public String getAvailableStock() { return availableStock; }
    public void setAvailableStock(String availableStock) { this.availableStock = availableStock; }
} 