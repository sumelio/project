package com.example.marketplaceapp.data.api

import com.example.marketplaceapp.data.entities.ProductDTO
import retrofit2.http.GET
import retrofit2.http.Path

/**
 * Retrofit API service interface for product-related endpoints.
 */
interface ProductApiService {
    
    /**
     * Retrieves all available products from the API.
     * @return List of ProductDTO
     */
    @GET("product")
    suspend fun getAllProducts(): List<ProductDTO>
    
    /**
     * Retrieves a specific product by its ID.
     * @param productId The unique identifier of the product
     * @return ProductDTO
     */
    @GET("product/{id}")
    suspend fun getProductById(@Path("id") productId: String): ProductDTO
}
