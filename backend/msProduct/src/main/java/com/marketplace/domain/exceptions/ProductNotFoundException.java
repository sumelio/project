package com.marketplace.domain.exceptions;

public class ProductNotFoundException extends RuntimeException {
    private final String productId;

    public ProductNotFoundException(String productId) {
        super(String.format("Product with ID '%s' not found", productId));
        this.productId = productId;
    }

    public ProductNotFoundException(String productId, String message) {
        super(message);
        this.productId = productId;
    }

    public String getProductId() {
        return productId;
    }
} 