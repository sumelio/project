package com.marketplace.domain;

public class PurchaseOptions {
    private Long price;

    public PurchaseOptions() {}

    public PurchaseOptions(Long price) {
        this.price = price;
    }

    public Long getPrice() { return price; }
    public void setPrice(Long price) { this.price = price; }
} 