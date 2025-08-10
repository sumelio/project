package com.example.marketplaceapp.presentation.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.marketplaceapp.presentation.ui.screens.ProductDetailScreen
import com.example.marketplaceapp.presentation.ui.screens.ProductListScreen

/**
 * Navigation destinations for the marketplace app.
 */
object MarketplaceDestinations {
    const val PRODUCT_LIST = "product_list"
    const val PRODUCT_DETAIL = "product_detail"
}

/**
 * Main navigation component for the marketplace app.
 * Handles navigation between product list and product detail screens.
 */
@Composable
fun MarketplaceNavigation(
    navController: NavHostController = rememberNavController()
) {
    NavHost(
        navController = navController,
        startDestination = MarketplaceDestinations.PRODUCT_LIST
    ) {
        // Product List Screen
        composable(MarketplaceDestinations.PRODUCT_LIST) {
            ProductListScreen(
                onProductClick = { productId ->
                    navController.navigate("${MarketplaceDestinations.PRODUCT_DETAIL}/$productId")
                }
            )
        }
        
        // Product Detail Screen
        composable("${MarketplaceDestinations.PRODUCT_DETAIL}/{productId}") { backStackEntry ->
            val productId = backStackEntry.arguments?.getString("productId") ?: ""
            ProductDetailScreen(
                productId = productId,
                onBackClick = {
                    navController.popBackStack()
                }
            )
        }
    }
}
