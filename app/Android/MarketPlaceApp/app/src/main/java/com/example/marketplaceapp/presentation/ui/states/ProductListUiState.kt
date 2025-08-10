package com.example.marketplaceapp.presentation.ui.states

import com.example.marketplaceapp.domain.models.Product

/**
 * UI State for the Product List screen following MVI pattern.
 * Represents all possible states the screen can be in.
 */
data class ProductListUiState(
    val isLoading: Boolean = false,
    val products: List<Product> = emptyList(),
    val errorMessage: String? = null,
    val isRefreshing: Boolean = false
)

/**
 * UI State for the Product Detail screen.
 * Represents all possible states the detail screen can be in.
 */
data class ProductDetailUiState(
    val isLoading: Boolean = false,
    val product: Product? = null,
    val errorMessage: String? = null,
    val selectedImageIndex: Int = 0
)
