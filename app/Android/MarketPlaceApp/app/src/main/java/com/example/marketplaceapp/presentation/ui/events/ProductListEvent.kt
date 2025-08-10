package com.example.marketplaceapp.presentation.ui.events

/**
 * Events that can occur in the Product List screen following MVI pattern.
 * These represent user interactions and system events.
 */
sealed class ProductListEvent {
    /**
     * Event triggered when the screen loads for the first time.
     */
    object LoadProducts : ProductListEvent()
    
    /**
     * Event triggered when the user pulls to refresh.
     */
    object RefreshProducts : ProductListEvent()
    
    /**
     * Event triggered when the user taps on a product card.
     */
    data class ProductClicked(val productId: String) : ProductListEvent()
    
    /**
     * Event triggered to retry loading after an error.
     */
    object RetryLoading : ProductListEvent()
}

/**
 * Events that can occur in the Product Detail screen.
 */
sealed class ProductDetailEvent {
    /**
     * Event triggered when the detail screen loads.
     */
    data class LoadProductDetail(val productId: String) : ProductDetailEvent()
    
    /**
     * Event triggered when the user changes the selected image.
     */
    data class ImageSelected(val imageIndex: Int) : ProductDetailEvent()
    
    /**
     * Event triggered to retry loading after an error.
     */
    object RetryLoading : ProductDetailEvent()
    
    /**
     * Event triggered when the user navigates back.
     */
    object NavigateBack : ProductDetailEvent()
}
