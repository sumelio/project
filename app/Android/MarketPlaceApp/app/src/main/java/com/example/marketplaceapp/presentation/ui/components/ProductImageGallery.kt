package com.example.marketplaceapp.presentation.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.marketplaceapp.presentation.ui.theme.*

/**
 * Product image gallery component that displays main image and thumbnail selector.
 * Based on the product detail design showing large main image with small thumbnails below.
 */
@Composable
fun ProductImageGallery(
    images: List<String>,
    selectedImageIndex: Int,
    onImageSelected: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier.fillMaxWidth()
    ) {
        // Main image
        AsyncImage(
            model = ImageRequest.Builder(LocalContext.current)
                .data(images.getOrNull(selectedImageIndex))
                .crossfade(true)
                .build(),
            contentDescription = "Product image",
            modifier = Modifier
                .fillMaxWidth()
                .height(350.dp)
                .clip(RoundedCornerShape(CornerRadius.medium))
                .background(MaterialTheme.colorScheme.surfaceVariant),
            contentScale = ContentScale.Crop
        )
        
        // Thumbnail selector
        if (images.size > 1) {
            Spacer(modifier = Modifier.height(Spacing.medium))
            
            LazyRow(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(Spacing.small),
                contentPadding = PaddingValues(horizontal = Spacing.medium)
            ) {
                itemsIndexed(images) { index, imageUrl ->
                    ThumbnailImage(
                        imageUrl = imageUrl,
                        isSelected = index == selectedImageIndex,
                        onClick = { onImageSelected(index) }
                    )
                }
            }
        }
    }
}

/**
 * Thumbnail image component for the image selector.
 */
@Composable
private fun ThumbnailImage(
    imageUrl: String,
    isSelected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val borderColor = if (isSelected) {
        MaterialTheme.colorScheme.primary
    } else {
        Color.Transparent
    }
    
    AsyncImage(
        model = ImageRequest.Builder(LocalContext.current)
            .data(imageUrl)
            .crossfade(true)
            .build(),
        contentDescription = "Product thumbnail",
        modifier = modifier
            .size(60.dp)
            .clip(RoundedCornerShape(CornerRadius.small))
            .border(
                width = 2.dp,
                color = borderColor,
                shape = RoundedCornerShape(CornerRadius.small)
            )
            .background(MaterialTheme.colorScheme.surfaceVariant)
            .clickable { onClick() },
        contentScale = ContentScale.Crop
    )
}

@Preview(showBackground = true)
@Composable
fun ProductImageGalleryPreview() {
    MarketPlaceAppTheme {
        val sampleImages = listOf(
            "https://example.com/image1.jpg",
            "https://example.com/image2.jpg",
            "https://example.com/image3.jpg",
            "https://example.com/image4.jpg"
        )
        
        ProductImageGallery(
            images = sampleImages,
            selectedImageIndex = 0,
            onImageSelected = {},
            modifier = Modifier.padding(16.dp)
        )
    }
}
