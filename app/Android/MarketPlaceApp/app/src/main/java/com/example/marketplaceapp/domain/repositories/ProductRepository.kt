package com.example.marketplaceapp.domain.repositories

import com.example.marketplaceapp.domain.models.Product

/**
 * Repository interface for product operations.
 * This defines the contract for product data access in the domain layer.
 */
interface ProductRepository {
    
    /**
     * Retrieves all available products.
     * @return List of products
     * @throws Exception if the operation fails
     */
    suspend fun getAllProducts(): List<Product>
    
    /**
     * Retrieves a specific product by its ID.
     * @param productId The unique identifier of the product
     * @return Product if found
     * @throws Exception if the product is not found or operation fails
     */
    suspend fun getProductById(productId: String): Product
}
