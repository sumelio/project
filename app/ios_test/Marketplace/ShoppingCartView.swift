import SwiftUI

struct ShoppingCartView: View {
    @EnvironmentObject var cartManager: CartManager
    
    var body: some View {
        ZStack {
            // Background overlay
            Color.black.opacity(0.3)
                .ignoresSafeArea()
                .onTapGesture {
                    cartManager.hideCart()
                }
            
            // Cart panel
            HStack {
                Spacer()
                
                VStack(alignment: .leading, spacing: 0) {
                    // Header
                    HStack {
                        Text("🛒 Carrito de compras")
                            .font(.title2)
                            .fontWeight(.bold)
                        
                        Spacer()
                        
                        Button(action: {
                            cartManager.hideCart()
                        }) {
                            Image(systemName: "xmark.circle.fill")
                                .font(.title2)
                                .foregroundColor(.gray)
                        }
                    }
                    .padding()
                    .background(Color(.systemBackground))
                    
                    // Cart content
                    if cartManager.items.isEmpty {
                        VStack {
                            Spacer()
                            VStack(spacing: 16) {
                                Image(systemName: "cart")
                                    .font(.system(size: 60))
                                    .foregroundColor(.gray)
                                
                                Text("El carrito está vacío.")
                                    .font(.headline)
                                    .foregroundColor(.gray)
                            }
                            Spacer()
                        }
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .background(Color(.systemBackground))
                    } else {
                        ScrollView {
                            LazyVStack(spacing: 12) {
                                ForEach(cartManager.items) { item in
                                    CartItemView(item: item)
                                }
                            }
                            .padding()
                        }
                        .background(Color(.systemBackground))
                        
                        // Footer with total and actions
                        VStack(spacing: 12) {
                            Divider()
                            
                            HStack {
                                Text("Total:")
                                    .font(.headline)
                                Spacer()
                                Text(cartManager.formattedTotalPrice)
                                    .font(.title2)
                                    .fontWeight(.bold)
                                    .foregroundColor(.blue)
                            }
                            
                            HStack(spacing: 12) {
                                Button("Vaciar carrito") {
                                    cartManager.clearCart()
                                }
                                .buttonStyle(.bordered)
                                .foregroundColor(.red)
                                .frame(maxWidth: .infinity)
                                
                                Button("Finalizar compra") {
                                    // Implement checkout functionality
                                }
                                .buttonStyle(.borderedProminent)
                                .frame(maxWidth: .infinity)
                            }
                        }
                        .padding()
                        .background(Color(.systemBackground))
                    }
                }
                .frame(width: 350)
                .background(Color(.systemBackground))
                .cornerRadius(12, corners: [.topLeft, .bottomLeft])
                .shadow(color: .black.opacity(0.2), radius: 10, x: -5, y: 0)
            }
        }
        .transition(.move(edge: .trailing))
    }
}

struct CartItemView: View {
    let item: CartItem
    @EnvironmentObject var cartManager: CartManager
    
    var body: some View {
        HStack(spacing: 12) {
            // Product Image
            AsyncImage(url: URL(string: item.product.images.first ?? "")) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } placeholder: {
                Rectangle()
                    .fill(Color.gray.opacity(0.3))
                    .overlay(
                        Image(systemName: "photo")
                            .foregroundColor(.gray)
                    )
            }
            .frame(width: 60, height: 60)
            .clipShape(RoundedRectangle(cornerRadius: 8))
            
            // Product Info
            VStack(alignment: .leading, spacing: 4) {
                Text(item.product.title)
                    .font(.headline)
                    .lineLimit(2)
                
                Text("\(item.product.formattedPrice) x \(item.quantity)")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
            
            // Quantity Controls
            VStack(spacing: 4) {
                Button(action: {
                    cartManager.updateQuantity(for: item.product.id, quantity: item.quantity + 1)
                }) {
                    Image(systemName: "plus.circle.fill")
                        .foregroundColor(.blue)
                }
                
                Text("\(item.quantity)")
                    .font(.headline)
                    .frame(minWidth: 30)
                
                Button(action: {
                    cartManager.updateQuantity(for: item.product.id, quantity: item.quantity - 1)
                }) {
                    Image(systemName: "minus.circle.fill")
                        .foregroundColor(.red)
                }
            }
            
            // Remove Button
            Button(action: {
                cartManager.removeFromCart(productId: item.product.id)
            }) {
                Image(systemName: "trash")
                    .foregroundColor(.red)
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }
}

// Extension for rounded corners
extension View {
    func cornerRadius(_ radius: CGFloat, corners: UIRectCorner) -> some View {
        clipShape(RoundedCorner(radius: radius, corners: corners))
    }
}

struct RoundedCorner: Shape {
    var radius: CGFloat = .infinity
    var corners: UIRectCorner = .allCorners

    func path(in rect: CGRect) -> Path {
        let path = UIBezierPath(
            roundedRect: rect,
            byRoundingCorners: corners,
            cornerRadii: CGSize(width: radius, height: radius)
        )
        return Path(path.cgPath)
    }
}

#Preview {
    ShoppingCartView()
        .environmentObject(CartManager())
} 