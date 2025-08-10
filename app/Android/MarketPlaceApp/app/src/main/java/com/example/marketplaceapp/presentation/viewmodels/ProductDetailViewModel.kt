package com.example.marketplaceapp.presentation.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.marketplaceapp.domain.repositories.ProductRepository
import com.example.marketplaceapp.presentation.ui.events.ProductDetailEvent
import com.example.marketplaceapp.presentation.ui.states.ProductDetailUiState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * ViewModel for the Product Detail screen following MVI pattern.
 * Manages the state and handles events from the UI.
 */
class ProductDetailViewModel(
    private val productRepository: ProductRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(ProductDetailUiState())
    val uiState: StateFlow<ProductDetailUiState> = _uiState.asStateFlow()
    
    /**
     * Handles events from the UI and updates the state accordingly.
     */
    fun handleEvent(event: ProductDetailEvent) {
        when (event) {
            is ProductDetailEvent.LoadProductDetail -> {
                executeLoadProductDetail(event.productId)
            }
            is ProductDetailEvent.ImageSelected -> {
                executeImageSelection(event.imageIndex)
            }
            is ProductDetailEvent.RetryLoading -> {
                // Retry with the last product ID if available
                _uiState.value.product?.let { product ->
                    executeLoadProductDetail(product.id)
                }
            }
            is ProductDetailEvent.NavigateBack -> {
                // Navigation handled by the UI layer
            }
        }
    }
    
    /**
     * Loads product details from the repository.
     */
    private fun executeLoadProductDetail(productId: String) {
        viewModelScope.launch {
            try {
                _uiState.value = _uiState.value.copy(
                    isLoading = true,
                    errorMessage = null
                )
                
                val product = productRepository.getProductById(productId)
                
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    product = product,
                    errorMessage = null,
                    selectedImageIndex = 0
                )
                
            } catch (exception: Exception) {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    errorMessage = exception.message ?: "An unknown error occurred"
                )
            }
        }
    }
    
    /**
     * Updates the selected image index.
     */
    private fun executeImageSelection(imageIndex: Int) {
        _uiState.value = _uiState.value.copy(
            selectedImageIndex = imageIndex
        )
    }
}
