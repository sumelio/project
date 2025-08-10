package com.example.marketplaceapp.presentation.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.marketplaceapp.domain.repositories.ProductRepository
import com.example.marketplaceapp.presentation.ui.events.ProductListEvent
import com.example.marketplaceapp.presentation.ui.states.ProductListUiState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * ViewModel for the Product List screen following MVI pattern.
 * Manages the state and handles events from the UI.
 */
class ProductListViewModel(
    private val productRepository: ProductRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(ProductListUiState())
    val uiState: StateFlow<ProductListUiState> = _uiState.asStateFlow()
    
    init {
        handleEvent(ProductListEvent.LoadProducts)
    }
    
    /**
     * Handles events from the UI and updates the state accordingly.
     */
    fun handleEvent(event: ProductListEvent) {
        when (event) {
            is ProductListEvent.LoadProducts -> {
                executeLoadProducts()
            }
            is ProductListEvent.RefreshProducts -> {
                executeRefreshProducts()
            }
            is ProductListEvent.ProductClicked -> {
                // Navigation handled by the UI layer
            }
            is ProductListEvent.RetryLoading -> {
                executeLoadProducts()
            }
        }
    }
    
    /**
     * Loads products from the repository.
     */
    private fun executeLoadProducts() {
        viewModelScope.launch {
            try {
                _uiState.value = _uiState.value.copy(
                    isLoading = true,
                    errorMessage = null
                )
                
                val products = productRepository.getAllProducts()
                
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    products = products,
                    errorMessage = null
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
     * Refreshes products from the repository.
     */
    private fun executeRefreshProducts() {
        viewModelScope.launch {
            try {
                _uiState.value = _uiState.value.copy(
                    isRefreshing = true,
                    errorMessage = null
                )
                
                val products = productRepository.getAllProducts()
                
                _uiState.value = _uiState.value.copy(
                    isRefreshing = false,
                    products = products,
                    errorMessage = null
                )
                
            } catch (exception: Exception) {
                _uiState.value = _uiState.value.copy(
                    isRefreshing = false,
                    errorMessage = exception.message ?: "An unknown error occurred"
                )
            }
        }
    }
}
