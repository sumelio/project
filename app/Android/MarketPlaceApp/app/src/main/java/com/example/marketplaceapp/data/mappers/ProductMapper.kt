package com.example.marketplaceapp.data.mappers

import com.example.marketplaceapp.data.entities.ProductDTO
import com.example.marketplaceapp.data.entities.SellerInformationDTO
import com.example.marketplaceapp.data.entities.ReputationDTO
import com.example.marketplaceapp.data.entities.MetricsDTO
import com.example.marketplaceapp.data.entities.PurchaseOptionsDTO
import com.example.marketplaceapp.data.entities.AdditionalDetailsDTO
import com.example.marketplaceapp.domain.models.Product
import com.example.marketplaceapp.domain.models.SellerInformation
import com.example.marketplaceapp.domain.models.Reputation
import com.example.marketplaceapp.domain.models.Metrics
import com.example.marketplaceapp.domain.models.PurchaseOptions
import com.example.marketplaceapp.domain.models.AdditionalDetails

/**
 * Mapper class to convert between DTO and domain models.
 * This follows the principle of separating data layer concerns from domain layer.
 */
object ProductMapper {
    
    /**
     * Converts ProductDTO to Product domain model.
     */
    fun toDomain(productDTO: ProductDTO): Product {
        return Product(
            id = productDTO.id,
            images = productDTO.images,
            title = productDTO.title,
            description = productDTO.description,
            price = productDTO.price,
            paymentMethods = productDTO.paymentMethods,
            sellerInformation = mapSellerInformation(productDTO.sellerInformation),
            additionalDetails = mapAdditionalDetails(productDTO.additionalDetails)
        )
    }
    
    /**
     * Converts a list of ProductDTO to a list of Product domain models.
     */
    fun toDomainList(productDTOList: List<ProductDTO>): List<Product> {
        return productDTOList.map { toDomain(it) }
    }
    
    /**
     * Maps SellerInformationDTO to SellerInformation domain model.
     */
    private fun mapSellerInformation(sellerInfoDTO: SellerInformationDTO): SellerInformation {
        return SellerInformation(
            name = sellerInfoDTO.name,
            productsCount = sellerInfoDTO.productsCount,
            reputation = mapReputation(sellerInfoDTO.reputation),
            metrics = mapMetrics(sellerInfoDTO.metrics),
            purchaseOptions = mapPurchaseOptions(sellerInfoDTO.purchaseOptions)
        )
    }
    
    /**
     * Maps ReputationDTO to Reputation domain model.
     */
    private fun mapReputation(reputationDTO: ReputationDTO): Reputation {
        return Reputation(
            level = reputationDTO.level,
            description = reputationDTO.description
        )
    }
    
    /**
     * Maps MetricsDTO to Metrics domain model.
     */
    private fun mapMetrics(metricsDTO: MetricsDTO): Metrics {
        return Metrics(
            sales = metricsDTO.sales,
            service = metricsDTO.service,
            delivery = metricsDTO.delivery
        )
    }
    
    /**
     * Maps PurchaseOptionsDTO to PurchaseOptions domain model.
     */
    private fun mapPurchaseOptions(purchaseOptionsDTO: PurchaseOptionsDTO): PurchaseOptions {
        return PurchaseOptions(
            price = purchaseOptionsDTO.price
        )
    }
    
    /**
     * Maps AdditionalDetailsDTO to AdditionalDetails domain model.
     */
    private fun mapAdditionalDetails(additionalDetailsDTO: AdditionalDetailsDTO): AdditionalDetails {
        return AdditionalDetails(
            ratings = additionalDetailsDTO.ratings,
            reviews = additionalDetailsDTO.reviews,
            availableStock = additionalDetailsDTO.availableStock
        )
    }
}
