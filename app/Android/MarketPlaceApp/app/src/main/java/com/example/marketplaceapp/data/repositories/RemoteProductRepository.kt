package com.example.marketplaceapp.data.repositories

import com.example.marketplaceapp.data.api.ProductApiService
import com.example.marketplaceapp.data.mappers.ProductMapper
import com.example.marketplaceapp.domain.models.Product
import com.example.marketplaceapp.domain.repositories.ProductRepository

/**
 * Implementation of ProductRepository that fetches data from remote API.
 * This class handles the data layer logic and maps DTOs to domain models.
 */
class RemoteProductRepository(
    private val apiService: ProductApiService
) : ProductRepository {
    
    /**
     * Retrieves all products from the remote API.
     * @return List of Product domain models
     * @throws Exception if the API call fails
     */
    override suspend fun getAllProducts(): List<Product> {
        try {
            val productDTOs = apiService.getAllProducts()
            return ProductMapper.toDomainList(productDTOs)
        } catch (exception: Exception) {
            throw Exception("Failed to fetch products: ${exception.message}", exception)
        }
    }
    
    /**
     * Retrieves a specific product by ID from the remote API.
     * @param productId The unique identifier of the product
     * @return Product domain model
     * @throws Exception if the API call fails or product is not found
     */
    override suspend fun getProductById(productId: String): Product {
        try {
            val productDTO = apiService.getProductById(productId)
            return ProductMapper.toDomain(productDTO)
        } catch (exception: Exception) {
            throw Exception("Failed to fetch product with ID $productId: ${exception.message}", exception)
        }
    }
}
