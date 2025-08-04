import Foundation
import Combine

class ProductService: ObservableObject {
    private let baseURL = "http://localhost:8080"
    private var cancellables = Set<AnyCancellable>()
    
    // MARK: - Published Properties
    @Published var products: [Product] = []
    @Published var currentProduct: Product?
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    // MARK: - API Methods
    func fetchAllProducts() {
        isLoading = true
        errorMessage = nil
        
        guard let url = URL(string: "\(baseURL)/product") else {
            errorMessage = "Invalid URL"
            isLoading = false
            return
        }
        
        URLSession.shared.dataTaskPublisher(for: url)
            .map(\.data)
            .decode(type: [Product].self, decoder: JSONDecoder())
            .receive(on: DispatchQueue.main)
            .sink(
                receiveCompletion: { [weak self] completion in
                    self?.isLoading = false
                    if case .failure(let error) = completion {
                        self?.errorMessage = error.localizedDescription
                    }
                },
                receiveValue: { [weak self] products in
                    self?.products = products
                }
            )
            .store(in: &cancellables)
    }
    
    func fetchProductById(_ id: String) {
        isLoading = true
        errorMessage = nil
        
        guard let url = URL(string: "\(baseURL)/product/\(id)") else {
            errorMessage = "Invalid URL"
            isLoading = false
            return
        }
        
        URLSession.shared.dataTaskPublisher(for: url)
            .map(\.data)
            .decode(type: Product.self, decoder: JSONDecoder())
            .receive(on: DispatchQueue.main)
            .sink(
                receiveCompletion: { [weak self] completion in
                    self?.isLoading = false
                    if case .failure(let error) = completion {
                        self?.errorMessage = error.localizedDescription
                    }
                },
                receiveValue: { [weak self] product in
                    self?.currentProduct = product
                }
            )
            .store(in: &cancellables)
    }
    
    func testConnection() -> AnyPublisher<Bool, Error> {
        guard let url = URL(string: "\(baseURL)/product") else {
            return Fail(error: URLError(.badURL))
                .eraseToAnyPublisher()
        }
        
        return URLSession.shared.dataTaskPublisher(for: url)
            .map { _ in true }
            .eraseToAnyPublisher()
    }
    
    // MARK: - Helper Methods
    func clearCurrentProduct() {
        currentProduct = nil
        errorMessage = nil
    }
    
    func clearError() {
        errorMessage = nil
    }
} 