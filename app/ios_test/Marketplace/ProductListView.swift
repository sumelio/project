import SwiftUI

struct ProductListView: View {
    @EnvironmentObject var productService: ProductService
    @EnvironmentObject var cartManager: CartManager
    let onProductSelected: (String) -> Void
    
    var body: some View {
        VStack {
            // Header
            HStack {
                Text("Marketplace")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                
                Spacer()
                
                Button(action: {
                    cartManager.showCart()
                }) {
                    HStack {
                        Image(systemName: "cart")
                        Text("\(cartManager.totalItems)")
                            .font(.caption)
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(Color.red)
                            .foregroundColor(.white)
                            .clipShape(Circle())
                    }
                }
            }
            .padding()
            
            // Product List
            if productService.isLoading {
                Spacer()
                ProgressView("Cargando productos...")
                Spacer()
            } else if let errorMessage = productService.errorMessage {
                Spacer()
                VStack {
                    Image(systemName: "exclamationmark.triangle")
                        .font(.largeTitle)
                        .foregroundColor(.orange)
                    Text("Error: \(errorMessage)")
                        .multilineTextAlignment(.center)
                        .padding()
                }
                Spacer()
            } else {
                ScrollView {
                    LazyVStack(spacing: 16) {
                        ForEach(productService.products) { product in
                            ProductRowView(product: product) {
                                onProductSelected(product.id)
                            }
                        }
                    }
                    .padding()
                }
            }
        }
        .onAppear {
            if productService.products.isEmpty {
                productService.fetchAllProducts()
            }
        }
    }
}

struct ProductRowView: View {
    let product: Product
    let onTap: () -> Void
    
    var body: some View {
        Button(action: onTap) {
            HStack(spacing: 12) {
                // Product Image
                AsyncImage(url: URL(string: product.images.first ?? "")) { image in
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
                .frame(width: 80, height: 80)
                .clipShape(RoundedRectangle(cornerRadius: 8))
                
                // Product Info
                VStack(alignment: .leading, spacing: 4) {
                    Text(product.title)
                        .font(.headline)
                        .lineLimit(2)
                        .foregroundColor(.primary)
                    
                    Text(product.formattedPrice)
                        .font(.title3)
                        .fontWeight(.semibold)
                        .foregroundColor(.blue)
                    
                    Text("Ver detalle")
                        .font(.caption)
                        .foregroundColor(.blue)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 4)
                        .background(Color.blue.opacity(0.1))
                        .clipShape(Capsule())
                }
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .foregroundColor(.gray)
            }
            .padding()
            .background(Color(.systemBackground))
            .cornerRadius(12)
            .shadow(color: .black.opacity(0.1), radius: 2, x: 0, y: 1)
        }
        .buttonStyle(PlainButtonStyle())
    }
}

#Preview {
    ProductListView { _ in }
        .environmentObject(ProductService())
        .environmentObject(CartManager())
} 