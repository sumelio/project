import SwiftUI

struct ContentView: View {
    @StateObject private var productService = ProductService()
    @EnvironmentObject var cartManager: CartManager
    @State private var selectedProductId: String?
    
    var body: some View {
        NavigationView {
            if let selectedProductId = selectedProductId {
                ProductDetailView(productId: selectedProductId)
                    .environmentObject(cartManager)
                    .environmentObject(productService)
                    .navigationBarBackButtonHidden(false)
                    .navigationBarItems(
                        leading: Button("← Volver") {
                            self.selectedProductId = nil
                        }
                    )
            } else {
                ProductListView(
                    onProductSelected: { productId in
                        selectedProductId = productId
                    }
                )
                .environmentObject(cartManager)
                .environmentObject(productService)
            }
        }
        .navigationViewStyle(StackNavigationViewStyle())
        .overlay(
            // Shopping Cart Overlay
            Group {
                if cartManager.isCartVisible {
                    ShoppingCartView()
                        .environmentObject(cartManager)
                        .transition(.move(edge: .trailing))
                }
            }
        )
        .animation(.easeInOut(duration: 0.3), value: cartManager.isCartVisible)
    }
}

#Preview {
    ContentView()
        .environmentObject(CartManager())
} 