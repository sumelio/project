package com.example.marketplaceapp.presentation.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.marketplaceapp.di.AppModule
import com.example.marketplaceapp.domain.models.Product
import com.example.marketplaceapp.domain.models.SellerInformation
import com.example.marketplaceapp.domain.models.Reputation
import com.example.marketplaceapp.domain.models.Metrics
import com.example.marketplaceapp.domain.models.PurchaseOptions
import com.example.marketplaceapp.domain.models.AdditionalDetails
import com.example.marketplaceapp.presentation.ui.components.*
import com.example.marketplaceapp.presentation.ui.events.ProductListEvent
import com.example.marketplaceapp.presentation.ui.states.ProductListUiState
import com.example.marketplaceapp.presentation.ui.theme.*
import com.example.marketplaceapp.presentation.viewmodels.ProductListViewModel

/**
 * Product List Screen - Main screen displaying marketplace products.
 * Implements the UI design from the provided screenshots with categories header
 * and product grid layout.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProductListScreen(
    onProductClick: (String) -> Unit,
    modifier: Modifier = Modifier,
    viewModel: ProductListViewModel = viewModel {
        ProductListViewModel(
            AppModule.provideProductRepository()
        )
    }
) {
    val uiState by viewModel.uiState.collectAsState()
    
    Column(
        modifier = modifier.fillMaxSize()
    ) {
        // Top App Bar with Categories
        CategoriesHeader(
            onMenuClick = { /* TODO: Implement menu navigation */ }
        )
        
        // Content based on UI state
        when {
            uiState.isLoading && uiState.products.isEmpty() -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    LoadingIndicator(message = "Cargando productos...")
                }
            }
            
            uiState.errorMessage != null && uiState.products.isEmpty() -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    ErrorMessage(
                        message = uiState.errorMessage ?: "",
                        onRetry = { viewModel.handleEvent(ProductListEvent.RetryLoading) }
                    )
                }
            }
            
            uiState.products.isEmpty() -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    EmptyState(
                        title = "No hay productos",
                        description = "No se encontraron productos disponibles en este momento."
                    ) {
                        PrimaryButton(
                            onClick = { viewModel.handleEvent(ProductListEvent.RetryLoading) }
                        ) {
                            Text("Reintentar")
                        }
                    }
                }
            }
            
            else -> {
                ProductListContent(
                    products = uiState.products,
                    isRefreshing = uiState.isRefreshing,
                    onProductClick = onProductClick,
                    onRefresh = { viewModel.handleEvent(ProductListEvent.RefreshProducts) }
                )
            }
        }
    }
}

/**
 * Categories header component matching the design with yellow background
 * and navigation categories.
 */
@Composable
private fun CategoriesHeader(
    onMenuClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .background(marketplaceYellow)
    ) {
        // Categories button
        Surface(
            modifier = Modifier
                .fillMaxWidth()
                .padding(Spacing.medium),
            shape = RoundedCornerShape(CornerRadius.small),
            color = Color.White.copy(alpha = 0.3f)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = Spacing.medium, vertical = Spacing.small),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Menu,
                    contentDescription = "Categories",
                    tint = Color.Black,
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(Spacing.small))
                Text(
                    text = "Categories",
                    style = MaterialTheme.typography.titleMedium,
                    color = Color.Black,
                    fontWeight = FontWeight.Medium
                )
            }
        }
        
        // Category tabs
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = Spacing.medium)
                .padding(bottom = Spacing.medium),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            listOf("Offers", "History", "Supermarket", "Fashion", "Sell", "Help").forEach { category ->
                Text(
                    text = category,
                    style = MaterialTheme.typography.bodyMedium,
                    color = Color.Black.copy(alpha = 0.8f),
                    textAlign = TextAlign.Center,
                    modifier = Modifier.weight(1f)
                )
            }
        }
    }
}

/**
 * Product list content with pull-to-refresh functionality.
 */
@Composable
private fun ProductListContent(
    products: List<Product>,
    isRefreshing: Boolean,
    onProductClick: (String) -> Unit,
    onRefresh: () -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier.fillMaxSize()
    ) {
        // "Productos" title
        Text(
            text = "Productos",
            style = MaterialTheme.typography.headlineMedium,
            color = MaterialTheme.colorScheme.onBackground,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(Spacing.medium)
        )
        
        // Product list
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(horizontal = Spacing.medium),
            verticalArrangement = Arrangement.spacedBy(Spacing.medium)
        ) {
            items(
                items = products,
                key = { it.id }
            ) { product ->
                ProductCard(
                    product = product,
                    onProductClick = onProductClick
                )
            }
            
            // Add bottom padding
            item {
                Spacer(modifier = Modifier.height(Spacing.large))
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun ProductListScreenPreview() {
    MarketPlaceAppTheme {
        val sampleProducts = listOf(
            Product(
                id = "1",
                images = listOf("https://example.com/image1.jpg"),
                title = "Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM",
                description = "Sample description",
                price = "1853861",
                paymentMethods = emptyList(),
                sellerInformation = SellerInformation(
                    name = "Samsung Store",
                    productsCount = "100mil",
                    reputation = Reputation("MercadoLíder", "¡Uno de los mejores del sitio!"),
                    metrics = Metrics("1000", "Brinda buena atención", "Entrega sus productos a tiempo"),
                    purchaseOptions = PurchaseOptions(1853861)
                ),
                additionalDetails = AdditionalDetails(
                    ratings = "4.8",
                    reviews = "769",
                    availableStock = "4"
                )
            ),
            Product(
                id = "2",
                images = listOf("https://example.com/image2.jpg"),
                title = "Samsung Galaxy NNNNN 5G Dual SIM 256 GB azul oscuro 8 GB RAM",
                description = "Sample description",
                price = "1853861",
                paymentMethods = emptyList(),
                sellerInformation = SellerInformation(
                    name = "Samsung Store",
                    productsCount = "100mil",
                    reputation = Reputation("MercadoLíder", "¡Uno de los mejores del sitio!"),
                    metrics = Metrics("1000", "Brinda buena atención", "Entrega sus productos a tiempo"),
                    purchaseOptions = PurchaseOptions(1853861)
                ),
                additionalDetails = AdditionalDetails(
                    ratings = "4.8",
                    reviews = "769",
                    availableStock = "4"
                )
            )
        )
        
        ProductListContent(
            products = sampleProducts,
            isRefreshing = false,
            onProductClick = {},
            onRefresh = {}
        )
    }
}
