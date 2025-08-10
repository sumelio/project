package com.example.marketplaceapp.presentation.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Share
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
import com.example.marketplaceapp.presentation.ui.events.ProductDetailEvent
import com.example.marketplaceapp.presentation.ui.states.ProductDetailUiState
import com.example.marketplaceapp.presentation.ui.theme.*
import com.example.marketplaceapp.presentation.viewmodels.ProductDetailViewModel
import java.text.NumberFormat
import java.util.Locale

/**
 * Product Detail Screen - Displays detailed information about a selected product.
 * Implements the UI design from the provided screenshots with breadcrumb navigation,
 * image gallery, product details, and purchase information.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProductDetailScreen(
    productId: String,
    onBackClick: () -> Unit,
    modifier: Modifier = Modifier,
    viewModel: ProductDetailViewModel = viewModel {
        ProductDetailViewModel(
            AppModule.provideProductRepository()
        )
    }
) {
    val uiState by viewModel.uiState.collectAsState()
    
    // Load product details when screen appears
    LaunchedEffect(productId) {
        viewModel.handleEvent(ProductDetailEvent.LoadProductDetail(productId))
    }
    
    Column(
        modifier = modifier.fillMaxSize()
    ) {
        // Top bar with back navigation
        ProductDetailTopBar(
            onBackClick = onBackClick,
            onShareClick = { /* TODO: Implement share functionality */ }
        )
        
        // Content based on UI state
        when {
            uiState.isLoading -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    LoadingIndicator(message = "Cargando producto...")
                }
            }
            
            uiState.errorMessage != null -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    ErrorMessage(
                        message = uiState.errorMessage ?: "",
                        onRetry = { viewModel.handleEvent(ProductDetailEvent.RetryLoading) }
                    )
                }
            }
            
            uiState.product != null -> {
                uiState.product?.let { product ->
                    ProductDetailContent(
                        product = product,
                        selectedImageIndex = uiState.selectedImageIndex,
                        onImageSelected = { index ->
                            viewModel.handleEvent(ProductDetailEvent.ImageSelected(index))
                        }
                    )
                }
            }
        }
    }
}

/**
 * Top bar component for product detail screen.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun ProductDetailTopBar(
    onBackClick: () -> Unit,
    onShareClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    TopAppBar(
        title = { },
        navigationIcon = {
            IconButton(onClick = onBackClick) {
                Icon(
                    imageVector = Icons.Default.ArrowBack,
                    contentDescription = "Back"
                )
            }
        },
        actions = {
            IconButton(onClick = onShareClick) {
                Icon(
                    imageVector = Icons.Default.Share,
                    contentDescription = "Share"
                )
            }
        },
        colors = TopAppBarDefaults.topAppBarColors(
            containerColor = marketplaceYellow
        ),
        modifier = modifier
    )
}

/**
 * Main content of the product detail screen.
 */
@Composable
private fun ProductDetailContent(
    product: Product,
    selectedImageIndex: Int,
    onImageSelected: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    LazyColumn(
        modifier = modifier.fillMaxSize(),
        contentPadding = PaddingValues(bottom = Spacing.massive)
    ) {
        item {
            // Breadcrumb navigation
            BreadcrumbNavigation(product = product)
        }
        
        item {
            Spacer(modifier = Modifier.height(Spacing.medium))
        }
        
        item {
            // Product image gallery
            ProductImageGallery(
                images = product.images,
                selectedImageIndex = selectedImageIndex,
                onImageSelected = onImageSelected,
                modifier = Modifier.padding(horizontal = Spacing.medium)
            )
        }
        
        item {
            Spacer(modifier = Modifier.height(Spacing.large))
        }
        
        item {
            // Product information
            ProductInformation(
                product = product,
                modifier = Modifier.padding(horizontal = Spacing.medium)
            )
        }
        
        item {
            Spacer(modifier = Modifier.height(Spacing.large))
        }
        
        item {
            // Purchase section
            PurchaseSection(
                product = product,
                modifier = Modifier.padding(horizontal = Spacing.medium)
            )
        }
    }
}

/**
 * Breadcrumb navigation component.
 */
@Composable
private fun BreadcrumbNavigation(
    product: Product,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier
            .fillMaxWidth()
            .background(marketplaceYellow)
            .padding(Spacing.medium),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = "Celulares y Teléfonos > Celulares y Smartphones > Samsung > Galaxy A55",
            style = MaterialTheme.typography.bodySmall,
            color = Color.Black.copy(alpha = 0.7f)
        )
        Spacer(modifier = Modifier.width(Spacing.small))
        Icon(
            imageVector = Icons.Default.Share,
            contentDescription = "Share",
            tint = Color.Black.copy(alpha = 0.7f),
            modifier = Modifier.size(16.dp)
        )
        Spacer(modifier = Modifier.width(Spacing.small))
        Text(
            text = "Compartir",
            style = MaterialTheme.typography.bodySmall,
            color = Color.Black.copy(alpha = 0.7f)
        )
    }
}

/**
 * Product information section.
 */
@Composable
private fun ProductInformation(
    product: Product,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier.fillMaxWidth()
    ) {
        // Status and sales info
        Text(
            text = "Nuevo | +1000 vendidos",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        
        Spacer(modifier = Modifier.height(Spacing.small))
        
        // Product title
        Text(
            text = product.title,
            style = MaterialTheme.typography.headlineMedium,
            color = MaterialTheme.colorScheme.onSurface,
            fontWeight = FontWeight.Bold
        )
        
        Spacer(modifier = Modifier.height(Spacing.small))
        
        // Rating
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = product.additionalDetails.ratings,
                style = MaterialTheme.typography.titleMedium,
                color = MaterialTheme.colorScheme.onSurface,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.width(Spacing.extraSmall))
            repeat(5) { index ->
                val starAlpha = if (index < product.additionalDetails.ratings.toFloatOrNull()?.toInt() ?: 0) 1f else 0.3f
                Text(
                    text = "★",
                    color = marketplaceYellow.copy(alpha = starAlpha),
                    style = MaterialTheme.typography.titleMedium
                )
            }
            Spacer(modifier = Modifier.width(Spacing.small))
            Text(
                text = "(${product.additionalDetails.reviews})",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
        
        Spacer(modifier = Modifier.height(Spacing.large))
        
        // Price
        Text(
            text = formatPrice(product.price),
            style = MaterialTheme.typography.displaySmall,
            color = MaterialTheme.colorScheme.onSurface,
            fontWeight = FontWeight.Bold
        )
        
        Spacer(modifier = Modifier.height(Spacing.small))
        
        // Payment info
        Text(
            text = "en 3 cuotas de \$ 617.954",
            style = MaterialTheme.typography.titleMedium,
            color = MaterialTheme.colorScheme.onSurface
        )
        
        Text(
            text = "con 0% interés",
            style = MaterialTheme.typography.bodyMedium,
            color = marketplaceGreen,
            fontWeight = FontWeight.Medium
        )
        
        Spacer(modifier = Modifier.height(Spacing.small))
        
        Text(
            text = "Ver los medios de pago",
            style = MaterialTheme.typography.bodyMedium,
            color = marketplaceBlue
        )
    }
}

/**
 * Purchase section with color selection.
 */
@Composable
private fun PurchaseSection(
    product: Product,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier.fillMaxWidth()
    ) {
        // Color selection
        Text(
            text = "Color: Azul oscuro",
            style = MaterialTheme.typography.titleMedium,
            color = MaterialTheme.colorScheme.onSurface,
            fontWeight = FontWeight.Medium
        )
        
        Spacer(modifier = Modifier.height(Spacing.medium))
        
        // Color preview with description
        Text(
            text = "Lo que tienes que saber de este producto",
            style = MaterialTheme.typography.titleMedium,
            color = MaterialTheme.colorScheme.onSurface,
            fontWeight = FontWeight.Medium
        )
        
        Spacer(modifier = Modifier.height(Spacing.small))
        
        Text(
            text = product.description,
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = TextAlign.Justify
        )
    }
}

/**
 * Formats price string to currency format.
 */
private fun formatPrice(price: String): String {
    return try {
        val priceValue = price.toLongOrNull() ?: return price
        val formatter = NumberFormat.getInstance(Locale("es", "CO"))
        formatter.format(priceValue)
    } catch (e: Exception) {
        price
    }
}

@Preview(showBackground = true)
@Composable
fun ProductDetailScreenPreview() {
    MarketPlaceAppTheme {
        val sampleProduct = Product(
            id = "1",
            images = listOf(
                "https://example.com/image1.jpg",
                "https://example.com/image2.jpg"
            ),
            title = "Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM",
            description = "The Samsung Galaxy A55 5G Dual SIM 256 GB in dark blue with 8 GB RAM is described as a device offering high performance due to its powerful processor and 8 GB of RAM, allowing for fast content transmission and simultaneous execution of multiple applications without delays.",
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
        
        ProductDetailContent(
            product = sampleProduct,
            selectedImageIndex = 0,
            onImageSelected = {}
        )
    }
}
