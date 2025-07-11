# MarketPlace - Product Detail Prototype

## Project Description

This project is a prototype for an item detail page inspired by MercadoLibre, including its supporting backend API. The application demonstrates a complete full-stack solution with modern architecture patterns and comprehensive testing.

**Company Name**: MarketPlace

---

## Technology Stack

### Backend
- **Java 21** - Programming language
- **Spring Boot 3.2.5** - Modern web framework
- **Gradle** - Build automation tool
- **Data Storage** - JSON file-based storage (no database required)
- **Docker** - Containerization support (optional)
- **Testing Framework** - JUnit 5, Mockito for mocking, JaCoCo for code coverage
- **Non-functional Requirements** - Proper error handling, comprehensive documentation, 80%+ code coverage

### Frontend
- **React 19** - UI framework with TypeScript
- **Redux Toolkit** - State management
- **Redux Saga** - Side effects management
- **CSS Modules** - Modular styling
- **Hexagonal Architecture** - Clean architecture pattern

---

## Architecture

This project implements **Hexagonal Architecture** (also known as Ports and Adapters) to ensure:
- **Separation of concerns** between business logic and external dependencies
- **Testability** through dependency inversion
- **Maintainability** with clear boundaries between layers
- **Flexibility** to swap adapters without affecting core business logic

---

## Quick Start

### 🐳 **Option 1: Docker Compose (Recommended)**

The fastest way to run the entire application:

```bash
# Clone the repository
git clone git@github.com:sumelio/project.git
cd project

# Start both services with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Access:**
- **Frontend**: http://localhost (production build with Nginx)
- **Backend API**: http://localhost:8080

### 🔧 **Option 2: Development Mode with Docker**

For development with hot reload:

```bash
# Start with development profile
docker-compose --profile development up -d

# View logs
docker-compose logs -f frontend-dev backend
```

**Access:**
- **Frontend Dev**: http://localhost:3000 (hot reload enabled)
- **Backend API**: http://localhost:8080

### 💻 **Option 3: Local Development (No Docker)**

```bash
# Terminal 1 - Backend
cd backend/msProduct
./gradlew bootRun

# Terminal 2 - Frontend
cd frontend
npm install && npm start
```

---

## Backend: Step-by-Step Guide

### 1. Project Structure

```
backend/msProduct/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/marketplace/
│   │   │        ├── application/          # Use cases (business logic)
│   │   │        ├── domain/               # Entities, value objects, interfaces
│   │   │        ├── infrastructure/       # Adapters (controllers, repositories)
│   │   │        │   └── config/           # Configuration classes
│   │   │        └── MsProductApplication.java
│   │   └── resources/
│   │        └── products.json             # Data store
│   └── test/
│        └── java/
│            └── com/marketplace/          # Unit tests
├── build.gradle                          # Build configuration
├── gradlew                               # Gradle wrapper
├── Dockerfile                           # Production container
├── .dockerignore                        # Docker build optimization
└── Dockerfile                           # Container configuration
```

### 2. Project Initialization

**Prerequisites:**
- Java 21 installed
- Gradle 8.x (via wrapper)

**Dependencies in `build.gradle`:**
- `spring-boot-starter-web` - Web framework
- `spring-boot-starter-test` - Testing utilities
- `jackson-databind` - JSON processing
- `junit-jupiter` - Testing framework
- `mockito` - Mocking framework
- `jacoco` - Code coverage

### 3. Domain Model

**Product.java** - Core entity
```java
public class Product {
    private String id;
    private List<String> images;
    private String title;
    private String description;
    private String price;
    private List<String> paymentMethods;
    private SellerInformation sellerInformation;  // Complex object
    private AdditionalDetails additionalDetails;
    // constructors, getters, setters
}
```

**Supporting Entities:**
- `AdditionalDetails.java` - Product ratings, reviews, stock
- `SellerInformation.java` - Seller data with reputation and metrics
- `Reputation.java` - Seller reputation information
- `Metrics.java` - Seller performance metrics
- `PurchaseOptions.java` - Purchase-related options

### 4. Application Layer (Use Cases)

**ProductService.java** - Business logic interface
```java
public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(String id);
    Product createProduct(Product product);
    Product updateProduct(String id, Product product);
    void deleteProduct(String id);
}
```

**ProductServiceImpl.java** - Implementation with business rules

### 5. Ports and Adapters Pattern

- **Port (Interface):** `ProductRepository` - Defines data access contract
- **Adapter (Implementation):** `JsonProductRepository` - JSON file-based storage
- **Port (Interface):** `ProductService` - Defines business operations
- **Adapter (Implementation):** `ProductController` - REST API endpoints

### 6. Infrastructure Layer

**ProductController.java** - REST API endpoints
```java
@RestController
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }
    
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }
    
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable String id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }
    
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
    }
}
```

**CorsConfig.java** - CORS configuration for frontend integration

### 7. API Response Example

**GET /product/1**
```json
{
    "id": "1",
    "images": [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
        "https://example.com/image3.jpg"
    ],
    "title": "Samsung Galaxy A55 5G Dual SIM 256 GB",
    "description": "Latest Samsung smartphone with 5G connectivity",
    "price": "1299.99",
    "paymentMethods": ["Credit Card", "Debit Card", "PayPal"],
    "sellerInformation": {
        "name": "Samsung Store",
        "productsCount": "1250",
        "reputation": {
            "level": "Platinum",
            "description": "Excellent seller"
        },
        "metrics": {
            "sales": "98%",
            "service": "99%",
            "delivery": "97%"
        },
        "purchaseOptions": {
            "price": 1299
        }
    },
    "additionalDetails": {
        "ratings": "4.6",
        "reviews": "850 reviews",
        "availableStock": "15"
    }
}
```

### 8. Testing Strategy

**Unit Testing Framework:**
- **JUnit 5** - Test framework
- **Mockito** - Mocking dependencies
- **Spring Boot Test** - Integration testing utilities
- **JaCoCo** - Code coverage analysis

**Test Coverage:**
- **Domain entities** - Constructor, getter/setter validation
- **Service layer** - Business logic and error handling
- **Repository layer** - Data access operations
- **Controller layer** - HTTP endpoint behavior
- **Configuration** - Spring configuration validation

#### Running Tests

```bash
# Run all unit tests
./gradlew test

# Run tests with coverage report
./gradlew test jacocoTestReport

# View coverage report
open build/reports/jacoco/test/html/index.html
```

**Coverage Targets Achieved:**
- **Line Coverage**: 80%+
- **Branch Coverage**: 80%+
- **Method Coverage**: 80%+
- **Class Coverage**: 90%+

### 9. Build and Run

**Development:**
```bash
# Build the project
./gradlew build

# Run the application
./gradlew bootRun

# Clean build
./gradlew clean build
```

**Production:**
```bash
# Create executable JAR
./gradlew bootJar

# Run the JAR file
java -jar build/libs/msProduct-0.0.1-SNAPSHOT.jar
```

**Docker (Optional):**
```bash
# Build Docker image
docker build -t marketplace-backend .

# Run container
docker run -p 8080:8080 marketplace-backend
```

---

## Frontend Architecture

### Technology Stack
- **React 19** with TypeScript
- **Redux Toolkit** for state management
- **Redux Saga** for asynchronous operations
- **CSS Modules** for component styling
- **Axios** for HTTP client
- **Jest & React Testing Library** for testing

### Project Structure
```
frontend/
├── src/
│   ├── application/store/       # Redux store configuration
│   ├── domain/entities/         # TypeScript interfaces
│   ├── infrastructure/
│   │   ├── api/                # API service layer
│   │   └── components/         # React components
│   └── __tests__/              # Test files
├── public/                     # Static assets
├── Dockerfile                  # Production container
├── Dockerfile.dev              # Development container
├── nginx.conf                  # Nginx configuration
├── .dockerignore               # Docker build optimization
└── package.json               # Dependencies and scripts
```

### Key Features
- **Product Detail Display** - Complete product information layout
- **Image Gallery** - Thumbnail navigation with main image display
- **Seller Information** - Reputation, metrics, and purchase options
- **Responsive Design** - Mobile-friendly CSS modules
- **State Management** - Redux with saga pattern for API calls
- **Error Handling** - Comprehensive error states and loading indicators

---

## 🐳 Docker Compose Configuration

### Services Overview

| Service | Container | Port | Description |
|---------|-----------|------|-------------|
| `backend` | marketplace-backend | 8080 | Spring Boot API with Amazon Corretto 21 |
| `frontend` | marketplace-frontend | 80/443 | React app served by Nginx |
| `frontend-dev` | marketplace-frontend-dev | 3000 | Development server with hot reload |

### Docker Compose Commands

```bash
# Production mode (Nginx + Spring Boot)
docker-compose up -d

# Development mode (React dev server + Spring Boot)
docker-compose --profile development up -d

# Build and restart
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Remove volumes
docker-compose down -v
```

### Environment Configuration

The docker-compose.yml includes:
- **Networking**: Internal communication between services
- **Volume Mounting**: Persistent data and development hot reload
- **Health Checks**: Automatic service monitoring
- **Environment Variables**: Proper configuration for each environment

---

## API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/product` | Retrieve all products | None |
| GET | `/product/{id}` | Retrieve product by ID | None |
| POST | `/product` | Create new product | Product JSON |
| PUT | `/product/{id}` | Update existing product | Product JSON |
| DELETE | `/product/{id}` | Delete product | None |

**Base URL**: `http://localhost:8080`

---

## Development Setup

### Prerequisites
- **Java 21** (backend)
- **Node.js 18+** and npm (frontend)
- **Docker & Docker Compose** (for containerized development)
- **Git** for version control

### Quick Start Options

#### 1. Docker Compose (Fastest)
```bash
git clone <repository-url>
cd project
docker-compose up -d
```

#### 2. Local Development
```bash
# Backend
cd backend/msProduct && ./gradlew bootRun

# Frontend  
cd frontend && npm install && npm start
```

#### 3. Mixed (Backend in Docker, Frontend local)
```bash
docker-compose up -d backend
cd frontend && npm start
```

For detailed setup instructions, see [run.md](run.md).

---

## Project Status

### ✅ **Completed Features**
- **Backend**: Full CRUD API with 80%+ test coverage
- **Frontend**: Complete product detail page with 87%+ test coverage
- **Architecture**: Hexagonal architecture implementation
- **Testing**: Comprehensive unit and integration tests
- **Documentation**: Complete setup and API documentation
- **CORS**: Configured for frontend-backend integration
- **Docker**: Full containerization with Docker Compose
- **Production Ready**: Nginx serving, Amazon Corretto 21, optimized builds

### 🚀 **Ready for Development**
Both backend and frontend services are fully functional with:
- Hot reload capabilities
- Comprehensive testing suites
- Production-ready build configurations
- Docker support for deployment
- Multi-environment configuration (development/production)

---

## Notes

- **No Database Required**: All data is stored in JSON files for simplicity
- **Hexagonal Architecture**: Ensures clean separation of concerns and testability
- **Modern Stack**: Uses latest versions of Java, Spring Boot, React, and TypeScript
- **Comprehensive Testing**: Both services exceed 80% code coverage
- **Production Ready**: Includes Docker configurations and build optimizations
- **Amazon Corretto 21**: AWS-optimized Java runtime for better performance
- **Nginx Serving**: Optimized static file serving with security headers
- **Checkout Logic**: Not implemented (out of scope for this prototype)
- **Recommendations**: Not implemented (out of scope for this prototype)
