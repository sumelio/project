package com.example.marketplaceapp.data.entities

import com.google.gson.annotations.SerializedName

/**
 * Data Transfer Object (DTO) for Product API responses.
 * This class represents the JSON structure received from the API.
 */
data class ProductDTO(
    @SerializedName("id")
    val id: String,
    @SerializedName("images")
    val images: List<String>,
    @SerializedName("title")
    val title: String,
    @SerializedName("description")
    val description: String,
    @SerializedName("price")
    val price: String,
    @SerializedName("paymentMethods")
    val paymentMethods: List<String>,
    @SerializedName("sellerInformation")
    val sellerInformation: SellerInformationDTO,
    @SerializedName("additionalDetails")
    val additionalDetails: AdditionalDetailsDTO
)

/**
 * DTO for seller information.
 */
data class SellerInformationDTO(
    @SerializedName("name")
    val name: String,
    @SerializedName("productsCount")
    val productsCount: String,
    @SerializedName("reputation")
    val reputation: ReputationDTO,
    @SerializedName("metrics")
    val metrics: MetricsDTO,
    @SerializedName("purchaseOptions")
    val purchaseOptions: PurchaseOptionsDTO
)

/**
 * DTO for seller reputation.
 */
data class ReputationDTO(
    @SerializedName("level")
    val level: String,
    @SerializedName("description")
    val description: String
)

/**
 * DTO for seller metrics.
 */
data class MetricsDTO(
    @SerializedName("sales")
    val sales: String,
    @SerializedName("service")
    val service: String,
    @SerializedName("delivery")
    val delivery: String
)

/**
 * DTO for purchase options.
 */
data class PurchaseOptionsDTO(
    @SerializedName("price")
    val price: Long
)

/**
 * DTO for additional product details.
 */
data class AdditionalDetailsDTO(
    @SerializedName("ratings")
    val ratings: String,
    @SerializedName("reviews")
    val reviews: String,
    @SerializedName("availableStock")
    val availableStock: String
)
