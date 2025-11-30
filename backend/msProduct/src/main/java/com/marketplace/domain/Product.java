// The package declaration is correct for Java source files under src/main/java/com/marketplace/domain
// If your IDE shows a package mismatch, ensure your source root is set to src/main/java
package com.marketplace.domain;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class Product {
    @NotBlank(message = "Product ID cannot be null or empty")
    private String id;

    private List<String> images;

    @NotBlank(message = "Product title cannot be null or empty")
    private String title;

    @NotBlank(message = "Product description cannot be null or empty")
    private String description;

    @NotBlank(message = "Product price cannot be null or empty")
    private String price;

    @NotEmpty(message = "Product payment methods cannot be null or empty")
    private List<String> paymentMethods;

    @NotNull(message = "Product seller information cannot be null")
    @Valid
    private SellerInformation sellerInformation;

    @NotNull(message = "Product additional details cannot be null")
    @Valid
    private AdditionalDetails additionalDetails;

    public Product() {}

    public Product(String id, List<String> images, String title, String description, String price, List<String> paymentMethods, SellerInformation sellerInformation, AdditionalDetails additionalDetails) {
        this.id = id;
        this.images = images;
        this.title = title;
        this.description = description;
        this.price = price;
        this.paymentMethods = paymentMethods;
        this.sellerInformation = sellerInformation;
        this.additionalDetails = additionalDetails;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public List<String> getPaymentMethods() { return paymentMethods; }
    public void setPaymentMethods(List<String> paymentMethods) { this.paymentMethods = paymentMethods; }

    public SellerInformation getSellerInformation() { return sellerInformation; }
    public void setSellerInformation(SellerInformation sellerInformation) { this.sellerInformation = sellerInformation; }

    public AdditionalDetails getAdditionalDetails() { return additionalDetails; }
    public void setAdditionalDetails(AdditionalDetails additionalDetails) { this.additionalDetails = additionalDetails; }
} 