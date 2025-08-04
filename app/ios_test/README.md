# Marketplace iOS App

A SwiftUI-based iOS application that mirrors the functionality of the React frontend, providing a native mobile experience for the Marketplace product detail prototype.

## 📱 Overview

This iOS app is built using SwiftUI and follows the same architectural patterns as the React frontend, providing:

- **Product Listing**: Browse all available products
- **Product Details**: View detailed product information with image galleries
- **Shopping Cart**: Add products to cart with quantity management
- **Seller Information**: View seller details and reputation
- **Payment Methods**: Display available payment options

## 🏗️ Architecture

The iOS app follows a similar architecture to the React frontend:

### Domain Layer
- `ProductModel.swift` - Data models matching the frontend entities
- `CartItem` - Shopping cart item model

### Application Layer
- `ProductService.swift` - API service for backend communication
- `CartManager.swift` - Shopping cart state management

### Infrastructure Layer
- `ContentView.swift` - Main navigation coordinator
- `ProductListView.swift` - Product listing screen
- `ProductDetailView.swift` - Product detail screen
- `ShoppingCartView.swift` - Shopping cart overlay

## 📁 Project Structure

```
ios/
├── Marketplace.xcodeproj/          # Xcode project file
├── Marketplace/                    # Main app source code
│   ├── MarketplaceApp.swift        # App entry point
│   ├── ContentView.swift           # Main navigation view
│   ├── ProductListView.swift       # Product list screen
│   ├── ProductDetailView.swift     # Product detail screen
│   ├── ShoppingCartView.swift      # Shopping cart overlay
│   ├── ProductModel.swift          # Data models
│   ├── ProductService.swift        # API service
│   ├── CartManager.swift           # Cart state management
│   ├── Assets.xcassets/            # App assets
│   └── Preview Content/            # SwiftUI preview assets
└── README.md                       # This file
```

## 🔧 Key Features

### 1. Product Listing
- Displays all products from the backend API
- Shows product images, titles, and prices
- "Ver detalle" button for navigation to product details
- Cart indicator in header

### 2. Product Detail View
- Full product information display
- Image gallery with thumbnail navigation
- Seller information and reputation
- Payment methods display
- "Agregar al carrito" functionality

### 3. Shopping Cart
- Slide-in cart overlay
- Add/remove items with quantity controls
- Total price calculation
- Empty cart state
- Checkout button (placeholder)

### 4. State Management
- `@StateObject` for service instances
- `@EnvironmentObject` for cart sharing
- `@Published` properties for reactive updates
- Combine framework for async operations

## 🚀 Getting Started

### Prerequisites
- Xcode 15.0 or later
- iOS 17.0+ deployment target
- Backend API running on `http://localhost:8080`

### Building the App

**⚠️ Important**: Due to Xcode project file issues, please follow the manual setup instructions:

1. **Follow setup instructions**:
   ```bash
   cd app/ios
   # Read SETUP_INSTRUCTIONS.md for manual project creation
   ```

2. **Create Xcode project manually**:
   - Open Xcode and create a new iOS App project
   - Use SwiftUI interface
   - Add all Swift files from the `Marketplace/` directory

3. **Configure the backend URL**:
   - The app is configured to connect to `http://localhost:8080`
   - Update `ProductService.swift` if your backend runs on a different URL

4. **Build and run**:
   - Select a simulator or device
   - Press `Cmd+R` to build and run

### Alternative: Use SwiftUI Previews
You can also test individual components using SwiftUI previews without creating a full project.

### Network Configuration

For iOS Simulator, the app can connect to `localhost`. For physical devices, you'll need to:

1. Update the `baseURL` in `ProductService.swift` to your computer's IP address
2. Ensure your backend allows connections from mobile devices
3. Configure network security settings if needed

## 🔄 API Integration

The iOS app uses the same backend API as the React frontend:

### Endpoints Used
- `GET /product` - Fetch all products
- `GET /product/{id}` - Fetch specific product

### Data Models
The iOS models match the backend JSON structure:
- `Product` - Main product entity
- `SellerInformation` - Seller details
- `Reputation` - Seller reputation
- `Metrics` - Performance metrics
- `AdditionalDetails` - Product metadata

## 🎨 UI/UX Features

### Design System
- **Colors**: System colors with blue accent
- **Typography**: System fonts with semantic sizing
- **Spacing**: Consistent padding and margins
- **Shadows**: Subtle elevation for cards

### Navigation
- Stack-based navigation
- Back button with custom text
- Smooth transitions between screens

### Responsive Design
- Adapts to different screen sizes
- Supports both iPhone and iPad
- Landscape and portrait orientations

## 🧪 Testing

### SwiftUI Previews
Each view includes SwiftUI previews for development:
```swift
#Preview {
    ProductListView { _ in }
        .environmentObject(ProductService())
        .environmentObject(CartManager())
}
```

### Manual Testing
1. **Product List**: Verify products load from API
2. **Product Detail**: Check image gallery and information
3. **Shopping Cart**: Test add/remove functionality
4. **Navigation**: Verify back button and transitions

## 🔗 Integration with Frontend

This iOS app is designed to work alongside the React frontend:

### Shared Backend
- Both apps use the same Java/Spring Boot backend
- Same API endpoints and data structures
- Consistent business logic

### Feature Parity
- Product browsing and details
- Shopping cart functionality
- Seller information display
- Payment method listing

### Development Workflow
- Backend changes affect both apps
- API updates require coordination
- Data model changes need synchronization

## 🚧 Future Enhancements

### Planned Features
1. **User Authentication**: Login/signup functionality
2. **Order Management**: Purchase history and tracking
3. **Push Notifications**: Price alerts and order updates
4. **Offline Support**: Local caching and offline mode
5. **Payment Integration**: Real payment processing

### Technical Improvements
1. **Unit Tests**: Comprehensive test coverage
2. **UI Tests**: Automated UI testing
3. **Performance**: Image caching and optimization
4. **Accessibility**: VoiceOver and accessibility features

## 📱 Platform Considerations

### iOS-Specific Features
- **Haptic Feedback**: Touch feedback for interactions
- **Dynamic Type**: Support for accessibility text sizes
- **Dark Mode**: Automatic theme adaptation
- **Safe Area**: Proper layout for notches and home indicators

### Device Support
- **iPhone**: Optimized for all iPhone sizes
- **iPad**: Adaptive layout for tablet screens
- **Accessibility**: VoiceOver and accessibility features

## 🔧 Configuration

### Build Settings
- **Deployment Target**: iOS 17.0+
- **Swift Version**: 5.0
- **Bundle Identifier**: `com.marketplace.Marketplace`
- **Device Family**: iPhone and iPad

### Network Security
For production deployment, consider:
- HTTPS enforcement
- Certificate pinning
- Network security configuration
- App Transport Security settings

## 📚 Resources

### Documentation
- [SwiftUI Documentation](https://developer.apple.com/documentation/swiftui)
- [Combine Framework](https://developer.apple.com/documentation/combine)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

### Related Projects
- [React Frontend](../frontend/) - Web application
- [Java Backend](../backend/) - API server
- [Project Documentation](../docs/) - Gherkin tests and documentation

---

**Note**: This iOS app is part of the larger Marketplace project ecosystem. For complete project information, see the [main README](../README.md). 