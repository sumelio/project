import Foundation

// MARK: - Product Models
struct Product: Identifiable, Codable {
    let id: String
    let images: [String]
    let title: String
    let description: String
    let price: String
    let paymentMethods: [String]
    let sellerInformation: SellerInformation
    let additionalDetails: AdditionalDetails
    
    var formattedPrice: String {
        return "$\(price)"
    }
}

struct SellerInformation: Codable {
    let name: String
    let productsCount: String
    let reputation: Reputation
    let metrics: Metrics
    let purchaseOptions: PurchaseOptions
}

struct Reputation: Codable {
    let level: String
    let description: String
}

struct Metrics: Codable {
    let sales: String
    let service: String
    let delivery: String
}

struct PurchaseOptions: Codable {
    let price: Int
}

struct AdditionalDetails: Codable {
    let ratings: String
    let reviews: String
    let availableStock: String
}

// MARK: - Cart Models
struct CartItem: Identifiable {
    let id = UUID()
    let product: Product
    var quantity: Int
    
    var totalPrice: Double {
        return Double(product.price) ?? 0.0 * Double(quantity)
    }
}

// MARK: - API Response Models
struct ProductResponse: Codable {
    let products: [Product]
}

struct ErrorResponse: Codable {
    let message: String
} 