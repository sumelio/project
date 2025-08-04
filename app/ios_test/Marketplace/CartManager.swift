import Foundation
import Combine

class CartManager: ObservableObject {
    @Published var items: [CartItem] = []
    @Published var isCartVisible = false
    
    var totalItems: Int {
        items.reduce(0) { $0 + $1.quantity }
    }
    
    var totalPrice: Double {
        items.reduce(0) { $0 + $1.totalPrice }
    }
    
    var formattedTotalPrice: String {
        return String(format: "$%.2f", totalPrice)
    }
    
    // MARK: - Cart Operations
    func addToCart(_ product: Product) {
        if let existingIndex = items.firstIndex(where: { $0.product.id == product.id }) {
            items[existingIndex].quantity += 1
        } else {
            let newItem = CartItem(product: product, quantity: 1)
            items.append(newItem)
        }
        isCartVisible = true
    }
    
    func removeFromCart(productId: String) {
        items.removeAll { $0.product.id == productId }
    }
    
    func updateQuantity(for productId: String, quantity: Int) {
        if let index = items.firstIndex(where: { $0.product.id == productId }) {
            if quantity <= 0 {
                items.remove(at: index)
            } else {
                items[index].quantity = quantity
            }
        }
    }
    
    func clearCart() {
        items.removeAll()
    }
    
    func showCart() {
        isCartVisible = true
    }
    
    func hideCart() {
        isCartVisible = false
    }
    
    // MARK: - Helper Methods
    func getItemQuantity(for productId: String) -> Int {
        return items.first { $0.product.id == productId }?.quantity ?? 0
    }
    
    func isProductInCart(_ productId: String) -> Bool {
        return items.contains { $0.product.id == productId }
    }
} 