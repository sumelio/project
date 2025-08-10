# MarketPlace Android App

A modern Android marketplace application built with Jetpack Compose and following CLEAR architecture principles.

## 🏗️ Architecture

This project implements the **CLEAR Architecture** pattern with the following layers:

### Domain Layer
- **Models**: Pure Kotlin data classes representing business entities
  - `Product.kt` - Core product entity
  - `SellerInformation.kt`, `Reputation.kt`, `Metrics.kt`, etc.
- **Repositories**: Interface contracts for data access
  - `ProductRepository.kt` - Repository interface

### Data Layer
- **Entities**: DTOs for API responses
  - `ProductDTO.kt` - Data transfer objects with JSON serialization
- **Mappers**: Convert between DTOs and domain models
  - `ProductMapper.kt` - Maps API responses to domain models
- **Repositories**: Implementation of repository interfaces
  - `RemoteProductRepository.kt` - Fetches data from REST API
- **Network**: API service definitions
  - `ProductApiService.kt` - Retrofit API interface
  - `NetworkModule.kt` - Network configuration

### Presentation Layer
- **ViewModels**: Business logic and state management with MVI pattern
  - `ProductListViewModel.kt` - Manages product list state
  - `ProductDetailViewModel.kt` - Manages product detail state
- **UI States**: Data classes representing UI state
  - `ProductListUiState.kt` - State for product list screen
- **Events**: User interaction events
  - `ProductListEvent.kt` - Events for user actions
- **Screens**: Jetpack Compose UI screens
  - `ProductListScreen.kt` - Main product listing
  - `ProductDetailScreen.kt` - Product detail view
- **Components**: Reusable UI components
  - `ProductCard.kt` - Product card component
  - `ProductImageGallery.kt` - Image gallery component
  - `MarketplaceComponents.kt` - Common UI components

## 🎨 Design System

The app follows Material Design 3 principles with:

- **Color System**: Custom marketplace color palette including brand colors
- **Typography**: Material 3 typography scale
- **Spacing**: 8dp grid system for consistent spacing
- **Components**: Reusable components following design system

## 🚀 Features

### Product List
- ✅ Display products in a scrollable list
- ✅ Product cards with image, title, price, and rating
- ✅ Categories header with marketplace branding
- ✅ Pull-to-refresh functionality
- ✅ Loading states and error handling
- ✅ Navigation to product details

### Product Detail
- ✅ Full product information display
- ✅ Image gallery with thumbnail selector
- ✅ Product title, description, and specifications
- ✅ Price and payment information
- ✅ Seller information and ratings
- ✅ Breadcrumb navigation
- ✅ Back navigation

## 🛠️ Technical Stack

- **Language**: Kotlin
- **UI Framework**: Jetpack Compose
- **Architecture**: CLEAR Architecture + MVI Pattern
- **Navigation**: Navigation Compose
- **Network**: Retrofit + OkHttp
- **Image Loading**: Coil
- **State Management**: StateFlow + Compose State
- **Dependency Injection**: Manual DI with object modules

## 📱 Screenshots Reference

The implementation follows the provided UI designs:
- Product list with yellow header and category navigation
- Product cards with images, titles, prices, and ratings
- Product detail with image gallery and comprehensive product information

## 🔧 Setup and Running

1. **Clone the repository**
2. **Open in Android Studio**
3. **Sync Gradle dependencies**
4. **Configure backend URL** in `NetworkModule.kt` (currently set to `localhost:8080`)
5. **Run the app** on an emulator or device

## 📋 API Integration

The app expects a REST API with the following endpoints:

- `GET /product` - Returns list of products
- `GET /product/{id}` - Returns specific product details

API response format follows the contracts defined in the contracts specification.

## 🧪 Testing

The architecture supports easy testing with:
- Separated concerns through clear layer boundaries
- Repository pattern for data mocking
- ViewModels with testable business logic
- UI components with preview support

## 🔮 Future Enhancements

- Add comprehensive unit tests
- Implement caching with Room database
- Add search and filtering capabilities
- Implement proper dependency injection with Hilt
- Add offline support
- Implement shopping cart functionality
- Add user authentication
- Performance optimizations with pagination

## 📄 Code Quality

The codebase follows:
- Kotlin coding conventions
- Clean architecture principles
- SOLID principles
- Material Design 3 guidelines
- Jetpack Compose best practices
- MVI pattern for state management
