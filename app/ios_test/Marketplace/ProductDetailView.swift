import SwiftUI

struct ProductDetailView: View {
    let productId: String
    @EnvironmentObject var productService: ProductService
    @EnvironmentObject var cartManager: CartManager
    @State private var selectedImageIndex = 0
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                if let product = productService.currentProduct {
                    // Product Images
                    ProductImageView(product: product, selectedIndex: $selectedImageIndex)
                    
                    // Product Info
                    ProductInfoView(product: product)
                    
                    // Seller Information
                    SellerInfoView(sellerInfo: product.sellerInformation)
                    
                    // Purchase Panel
                    PurchasePanelView(product: product)
                    
                    // Additional Details
                    AdditionalDetailsView(details: product.additionalDetails)
                    
                } else if productService.isLoading {
                    VStack {
                        ProgressView("Cargando producto...")
                            .padding()
                    }
                } else if let errorMessage = productService.errorMessage {
                    VStack {
                        Image(systemName: "exclamationmark.triangle")
                            .font(.largeTitle)
                            .foregroundColor(.orange)
                        Text("Error: \(errorMessage)")
                            .multilineTextAlignment(.center)
                            .padding()
                    }
                }
            }
            .padding()
        }
        .onAppear {
            productService.fetchProductById(productId)
        }
        .onDisappear {
            productService.clearCurrentProduct()
        }
    }
}

struct ProductImageView: View {
    let product: Product
    @Binding var selectedIndex: Int
    
    var body: some View {
        VStack {
            // Main Image
            AsyncImage(url: URL(string: product.images[selectedIndex])) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fit)
            } placeholder: {
                Rectangle()
                    .fill(Color.gray.opacity(0.3))
                    .overlay(
                        Image(systemName: "photo")
                            .foregroundColor(.gray)
                    )
            }
            .frame(height: 300)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            
            // Thumbnail Strip
            if product.images.count > 1 {
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        ForEach(Array(product.images.enumerated()), id: \.offset) { index, imageUrl in
                            AsyncImage(url: URL(string: imageUrl)) { image in
                                image
                                    .resizable()
                                    .aspectRatio(contentMode: .fill)
                            } placeholder: {
                                Rectangle()
                                    .fill(Color.gray.opacity(0.3))
                            }
                            .frame(width: 60, height: 60)
                            .clipShape(RoundedRectangle(cornerRadius: 8))
                            .overlay(
                                RoundedRectangle(cornerRadius: 8)
                                    .stroke(selectedIndex == index ? Color.blue : Color.clear, lineWidth: 2)
                            )
                            .onTapGesture {
                                selectedIndex = index
                            }
                        }
                    }
                    .padding(.horizontal)
                }
            }
        }
    }
}

struct ProductInfoView: View {
    let product: Product
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(product.title)
                .font(.title2)
                .fontWeight(.bold)
            
            Text(product.formattedPrice)
                .font(.title)
                .fontWeight(.bold)
                .foregroundColor(.blue)
            
            Text(product.description)
                .font(.body)
                .foregroundColor(.secondary)
            
            // Payment Methods
            VStack(alignment: .leading, spacing: 8) {
                Text("Métodos de pago:")
                    .font(.headline)
                
                ForEach(product.paymentMethods, id: \.self) { method in
                    HStack {
                        Image(systemName: "creditcard")
                            .foregroundColor(.green)
                        Text(method)
                    }
                }
            }
        }
    }
}

struct SellerInfoView: View {
    let sellerInfo: SellerInformation
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Información del vendedor")
                .font(.headline)
            
            VStack(alignment: .leading, spacing: 8) {
                Text("Vendedor: \(sellerInfo.name)")
                Text("Productos: \(sellerInfo.productsCount)")
                Text("Reputación: \(sellerInfo.reputation.level)")
                Text("Descripción: \(sellerInfo.reputation.description)")
            }
            .font(.body)
            .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

struct PurchasePanelView: View {
    let product: Product
    @EnvironmentObject var cartManager: CartManager
    
    var body: some View {
        VStack(spacing: 12) {
            Text("Opciones de compra")
                .font(.headline)
            
            HStack(spacing: 12) {
                Button("Comprar ahora") {
                    // Implement buy now functionality
                }
                .buttonStyle(.borderedProminent)
                .frame(maxWidth: .infinity)
                
                Button("Agregar al carrito") {
                    cartManager.addToCart(product)
                }
                .buttonStyle(.bordered)
                .frame(maxWidth: .infinity)
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

struct AdditionalDetailsView: View {
    let details: AdditionalDetails
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Detalles adicionales")
                .font(.headline)
            
            VStack(alignment: .leading, spacing: 8) {
                Text("Calificaciones: \(details.ratings)")
                Text("Reseñas: \(details.reviews)")
                Text("Stock disponible: \(details.availableStock)")
            }
            .font(.body)
            .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

#Preview {
    ProductDetailView(productId: "1")
        .environmentObject(ProductService())
        .environmentObject(CartManager())
} 