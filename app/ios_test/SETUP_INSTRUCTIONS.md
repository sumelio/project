# iOS Project Setup Instructions

Due to Xcode project file corruption issues, please follow these manual steps to create the iOS project in Xcode.

## 🚀 Manual Setup Steps

### 1. Create New Xcode Project

1. **Open Xcode**
2. **Create a new project**:
   - Choose "App" under iOS
   - Click "Next"

3. **Configure project**:
   - **Product Name**: `Marketplace`
   - **Team**: Your development team
   - **Organization Identifier**: `com.marketplace`
   - **Interface**: `SwiftUI`
   - **Language**: `Swift`
   - **Use Core Data**: Unchecked
   - **Include Tests**: Checked (optional)

4. **Save project**:
   - Choose location: `app/ios/`
   - Click "Create"

### 2. Replace Default Files

Replace the default files with our custom implementations:

#### Replace `MarketplaceApp.swift`:
```swift
import SwiftUI

@main
struct MarketplaceApp: App {
    @StateObject private var cartManager = CartManager()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(cartManager)
        }
    }
}
```

#### Replace `ContentView.swift`:
Use the content from `Marketplace/ContentView.swift`

#### Add New Files:
Add these files to your project:

1. **ProductListView.swift** - Product listing screen
2. **ProductDetailView.swift** - Product detail screen  
3. **ShoppingCartView.swift** - Shopping cart overlay
4. **ProductModel.swift** - Data models
5. **ProductService.swift** - API service
6. **CartManager.swift** - Cart state management

### 3. Configure Project Settings

1. **Deployment Target**: Set to iOS 17.0+
2. **Device Family**: iPhone and iPad
3. **Orientation**: Portrait and Landscape (iPhone), All (iPad)

### 4. Add Assets

1. **App Icon**: Add your app icon to `Assets.xcassets/AppIcon.appiconset/`
2. **Accent Color**: Configure in `Assets.xcassets/AccentColor.colorset/`

### 5. Network Configuration

For iOS Simulator:
- The app will work with `localhost:8080` by default

For Physical Devices:
- Update `ProductService.swift` baseURL to your computer's IP address
- Ensure backend allows connections from mobile devices

## 📁 File Structure

After setup, your project should look like:

```
Marketplace.xcodeproj/
Marketplace/
├── MarketplaceApp.swift        # App entry point
├── ContentView.swift           # Main navigation
├── ProductListView.swift       # Product list screen
├── ProductDetailView.swift     # Product detail screen
├── ShoppingCartView.swift      # Shopping cart overlay
├── ProductModel.swift          # Data models
├── ProductService.swift        # API service
├── CartManager.swift           # Cart state management
├── Assets.xcassets/            # App assets
└── Preview Content/            # SwiftUI previews
```

## 🔧 Build and Run

1. **Select target device**: Choose iOS Simulator or connected device
2. **Build**: Press `Cmd+B` or click the Play button
3. **Run**: Press `Cmd+R` to build and run

## 🐛 Troubleshooting

### Common Issues:

1. **Build Errors**:
   - Ensure all Swift files are added to the target
   - Check that deployment target is iOS 17.0+

2. **Network Issues**:
   - Verify backend is running on `localhost:8080`
   - For physical devices, update baseURL in `ProductService.swift`

3. **Missing Files**:
   - Ensure all Swift files are included in the project target
   - Check file references in the project navigator

### Alternative Setup:

If you continue having issues, you can:

1. **Use SwiftUI Preview**: Open individual Swift files and use the preview canvas
2. **Test Components**: Each view has SwiftUI previews for testing
3. **Manual Testing**: Build and test components individually

## 📱 Features Included

- ✅ Product listing with images and prices
- ✅ Product detail view with image gallery
- ✅ Shopping cart with quantity management
- ✅ Seller information display
- ✅ Payment methods listing
- ✅ Navigation between screens
- ✅ State management with Combine
- ✅ API integration with backend

## 🔗 Integration

This iOS app integrates with:
- **Backend**: Java/Spring Boot API (`localhost:8080`)
- **Frontend**: React web application
- **Data**: Same product models and cart functionality

---

**Note**: The Swift source files are ready to use. Simply create the Xcode project manually and add the files as described above. 