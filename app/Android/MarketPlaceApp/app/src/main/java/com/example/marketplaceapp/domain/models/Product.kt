package com.example.marketplaceapp.domain.models

/**
 * Domain model representing a product in the marketplace.
 * This is the core business entity used throughout the application.
 */
data class Product(
    val id: String,
    val images: List<String>,
    val title: String,
    val description: String,
    val price: String,
    val paymentMethods: List<String>,
    val sellerInformation: SellerInformation,
    val additionalDetails: AdditionalDetails
)

/**
 * Represents seller information for a product.
 */
data class SellerInformation(
    val name: String,
    val productsCount: String,
    val reputation: Reputation,
    val metrics: Metrics,
    val purchaseOptions: PurchaseOptions
)

/**
 * Represents seller reputation details.
 */
data class Reputation(
    val level: String,
    val description: String
)

/**
 * Represents seller performance metrics.
 */
data class Metrics(
    val sales: String,
    val service: String,
    val delivery: String
)

/**
 * Represents purchase options for a product.
 */
data class PurchaseOptions(
    val price: Long
)

/**
 * Represents additional product details like ratings and reviews.
 */
data class AdditionalDetails(
    val ratings: String,
    val reviews: String,
    val availableStock: String
)
