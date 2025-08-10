package com.example.marketplaceapp.di

import com.example.marketplaceapp.data.api.ProductApiService
import com.example.marketplaceapp.data.network.NetworkModule
import com.example.marketplaceapp.data.repositories.RemoteProductRepository
import com.example.marketplaceapp.domain.repositories.ProductRepository

/**
 * Dependency injection module for the marketplace application.
 * Provides instances of repositories and other dependencies.
 */
object AppModule {
    
    /**
     * Provides ProductRepository instance.
     */
    fun provideProductRepository(): ProductRepository {
        return RemoteProductRepository(
            apiService = provideProductApiService()
        )
    }
    
    /**
     * Provides ProductApiService instance.
     */
    private fun provideProductApiService(): ProductApiService {
        return NetworkModule.productApiService
    }
}
