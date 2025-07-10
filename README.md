# MarketPlace

## Project Description

This project is a prototype for an item detail page inspired by MercadoLibre, including its supporting backend API. The company name is: MarketPlace.

---

## Stack Tecnológico

### Backend
- **Java 21** - Main language
- **Spring Boot** - Modern web framework
- **Gradle** - Build tool
- **Data** - No database; data is stored in a JSON file
- **Docker** - Developer container (optional)

### Frontend
- **TypeScript** - Static language
- **CSS Modules** - Modular styles

---

## Architecture

This project uses **Hexagonal Architecture**
---

## Backend: Step-by-Step Guide

### 1. Project Structure

```
msProduct/
 ├── src/
 │   ├── main/
 │   │   ├── java/
 │   │   │   └── com/marketplace/
 │   │   │        ├── application/      # Use cases (business logic)
 │   │   │        ├── domain/           # Entities, value objects, interfaces
 │   │   │        ├── infrastructure/   # Adapters (controllers, file storage)
 │   │   │        └── MsProductApplication.java
 │   │   └── resources/
 │   │        └── products.json         # Data store
 │   └── test/
 │        └── java/...
 ├── build.gradle
 └── README.md
```

### 2. Initialize the Project

- Create a new Gradle project (Java 12, Spring Boot)
- Add dependencies in `build.gradle`:
  - spring-boot-starter-web
  - spring-boot-starter-test
  - jackson-databind
  - junit-jupiter
  - mockito
  - jacoco

### 3. Define the Domain Model

**Product.java**
```java
public class Product {
    private String id;
    private List<String> images;
    private String title;
    private String description;
    private String price;
    private List<String> paymentMethods;
    private String sellerInformation;
    private AdditionalDetails additionalDetails;
    // getters, setters, constructors
}
```

**AdditionalDetails.java**
```java
public class AdditionalDetails {
    private String ratings;
    private String reviews;
    private String availableStock;
    // getters, setters, constructors
}
```

### 4. Application Layer (Use Cases)

**ProductService.java**
```java
public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(String id);
    Product createProduct(Product product);
    Product updateProduct(String id, Product product);
    void deleteProduct(String id);
}
```

### 5. Ports and Adapters

- **Port:** `ProductRepository` interface (in `domain`)
- **Adapter:** `JsonProductRepository` (in `infrastructure`) reads/writes to `products.json`

### 6. Infrastructure Layer

- **Controller:** REST endpoints (`ProductController.java`)
- **Repository Adapter:** Reads/writes products from/to `products.json`

### 7. Example Endpoint Implementation

**ProductController.java**
```java
@RestController
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;
    // constructor

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }
    // POST, PUT, DELETE...
}
```

### 8. Example Response

**GET /product/1**
```json
{
    "id": "1",
    "images": ["image1", "image2", "image3"],
    "title": "Product title",
    "description": "Product description",
    "price": "Product price",
    "paymentMethods": ["payment_method1", "payment_method2", "payment_method3"],
    "sellerInformation": "Product seller information",
    "additionalDetails": {
        "ratings": "Product ratings",
        "reviews": "Product reviews",
        "availableStock": "Product available stock"
    }
}
```

### 9. Testing

- Use JUnit and Mockito for unit tests (application and domain layers)
- Use Jacoco for code coverage

### 10. Build and Run

- Build:
  ```sh
  ./gradlew build
  ```
- Run:
  ```sh
  ./gradlew bootRun
  ```

---

## Endpoints
- GET /product
- GET /product/:id
- POST /product
- PUT /product/:id
- DELETE /product/:id

---

## Notes
- No database is used; all data is stored in a JSON file.
- The backend is designed to be easily testable and maintainable using Hexagonal Architecture.
- Checkout and recommendations logic are not required.
