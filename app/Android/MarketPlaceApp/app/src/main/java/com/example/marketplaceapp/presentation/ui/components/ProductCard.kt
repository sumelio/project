package com.example.marketplaceapp.presentation.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.marketplaceapp.domain.models.Product
import com.example.marketplaceapp.domain.models.SellerInformation
import com.example.marketplaceapp.domain.models.Reputation
import com.example.marketplaceapp.domain.models.Metrics
import com.example.marketplaceapp.domain.models.PurchaseOptions
import com.example.marketplaceapp.domain.models.AdditionalDetails
import com.example.marketplaceapp.presentation.ui.theme.*
import java.text.NumberFormat
import java.util.Locale

/**
 * Product card component that displays product information in a card format.
 * Based on the marketplace UI design showing product image, title, price, and rating.
 */
@Composable
fun ProductCard(
    product: Product,
    onProductClick: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    MarketplaceCard(
        modifier = modifier
            .fillMaxWidth()
            .clickable { onProductClick(product.id) }
    ) {
        Column(
            modifier = Modifier.padding(Spacing.medium)
        ) {
            // Product Image
            AsyncImage(
                model = ImageRequest.Builder(LocalContext.current)
                    .data(product.images.firstOrNull())
                    .crossfade(true)
                    .build(),
                contentDescription = product.title,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp)
                    .clip(RoundedCornerShape(CornerRadius.medium))
                    .background(MaterialTheme.colorScheme.surfaceVariant),
                contentScale = ContentScale.Crop
            )
            
            Spacer(modifier = Modifier.height(Spacing.medium))
            
            // Product Title
            Text(
                text = product.title,
                style = MaterialTheme.typography.titleMedium,
                color = MaterialTheme.colorScheme.onSurface,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis
            )
            
            Spacer(modifier = Modifier.height(Spacing.small))
            
            // Price
            Text(
                text = formatPrice(product.price),
                style = MaterialTheme.typography.headlineSmall.copy(
                    fontWeight = FontWeight.Bold
                ),
                color = MaterialTheme.colorScheme.primary
            )
            
            Spacer(modifier = Modifier.height(Spacing.small))
            
            // Rating and Reviews Row
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.fillMaxWidth()
            ) {
                // Rating
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = product.additionalDetails.ratings,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        fontWeight = FontWeight.Medium
                    )
                    Spacer(modifier = Modifier.width(Spacing.extraSmall))
                    // Star rating indicator
                    repeat(5) { index ->
                        val starAlpha = if (index < product.additionalDetails.ratings.toFloatOrNull()?.toInt() ?: 0) 1f else 0.3f
                        Text(
                            text = "★",
                            color = marketplaceYellow.copy(alpha = starAlpha),
                            style = MaterialTheme.typography.bodySmall
                        )
                    }
                    Spacer(modifier = Modifier.width(Spacing.small))
                    Text(
                        text = "(${product.additionalDetails.reviews})",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(Spacing.small))
            
            // View Details Button
            PrimaryButton(
                onClick = { onProductClick(product.id) },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Ver detalle")
            }
        }
    }
}

/**
 * Formats price string to currency format.
 */
private fun formatPrice(price: String): String {
    return try {
        val priceValue = price.toLongOrNull() ?: return price
        val formatter = NumberFormat.getCurrencyInstance(Locale("es", "CO"))
        formatter.format(priceValue)
    } catch (e: Exception) {
        "$$price"
    }
}

@Preview(showBackground = true)
@Composable
fun ProductCardPreview() {
    MarketPlaceAppTheme {
        val sampleProduct = Product(
            id = "1",
            images = listOf("https://example.com/image.jpg"),
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
        )
        
        ProductCard(
            product = sampleProduct,
            onProductClick = {},
            modifier = Modifier.padding(16.dp)
        )
    }
}
