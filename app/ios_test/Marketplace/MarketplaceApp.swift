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