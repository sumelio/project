package com.marketplace.domain;

public class SellerInformation {
    private String name;
    private String productsCount;
    private Reputation reputation;
    private Metrics metrics;
    private PurchaseOptions purchaseOptions;

    public SellerInformation() {}

    public SellerInformation(String name, String productsCount, Reputation reputation, Metrics metrics, PurchaseOptions purchaseOptions) {
        this.name = name;
        this.productsCount = productsCount;
        this.reputation = reputation;
        this.metrics = metrics;
        this.purchaseOptions = purchaseOptions;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getProductsCount() { return productsCount; }
    public void setProductsCount(String productsCount) { this.productsCount = productsCount; }

    public Reputation getReputation() { return reputation; }
    public void setReputation(Reputation reputation) { this.reputation = reputation; }

    public Metrics getMetrics() { return metrics; }
    public void setMetrics(Metrics metrics) { this.metrics = metrics; }

    public PurchaseOptions getPurchaseOptions() { return purchaseOptions; }
    public void setPurchaseOptions(PurchaseOptions purchaseOptions) { this.purchaseOptions = purchaseOptions; }
} 