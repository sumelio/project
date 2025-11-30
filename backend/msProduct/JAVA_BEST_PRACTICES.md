# Java Best Practices Guide

This document outlines best practices for Java development in the Marketplace microservice project.

## Table of Contents
1. [Code Structure and Organization](#code-structure-and-organization)
2. [Naming Conventions](#naming-conventions)
3. [Exception Handling](#exception-handling)
4. [Logging](#logging)
5. [Validation](#validation)
6. [Testing](#testing)
7. [Spring Boot Specific](#spring-boot-specific)
8. [Security](#security)
9. [Performance](#performance)
10. [Documentation](#documentation)

---

## Code Structure and Organization

### Package Organization
- Follow layered architecture pattern:
  - `domain`: Business entities, repository interfaces, domain exceptions
  - `application`: Business logic, service interfaces and implementations
  - `infrastructure`: Controllers, repository implementations, configurations

### Class Structure Order
```java
// 1. Package declaration
package com.marketplace.domain;

// 2. Imports (organized: java.*, javax.*, org.*, com.*)
import java.util.List;
import org.slf4j.Logger;
import com.marketplace.domain.exceptions.*;

// 3. Class/Interface declaration with Javadoc
/**
 * Represents a product in the marketplace.
 */
public class Product {
    // 4. Static constants (public first, then private)
    private static final Logger logger = LoggerFactory.getLogger(Product.class);
    public static final int MAX_NAME_LENGTH = 255;

    // 5. Instance variables (private)
    private String id;
    private String name;

    // 6. Constructors (no-arg first, then parameterized)
    public Product() {}

    public Product(String id, String name) {
        this.id = id;
        this.name = name;
    }

    // 7. Public methods
    public void updateName(String name) {}

    // 8. Protected/Package methods
    protected void internalMethod() {}

    // 9. Private methods
    private void helperMethod() {}

    // 10. Getters and Setters (at the end)
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
}
```

---

## Naming Conventions

### Classes and Interfaces
- **Classes**: Use PascalCase, nouns: `ProductService`, `UserRepository`
- **Interfaces**: Use PascalCase, nouns or adjectives: `ProductRepository`, `Serializable`
- **Abstract Classes**: Prefix with `Abstract` or `Base`: `AbstractEntity`, `BaseRepository`
- **Exception Classes**: Suffix with `Exception`: `ValidationException`, `ProductNotFoundException`

### Methods
- Use camelCase, start with verbs:
  - **Getters**: `getName()`, `isActive()`, `hasPermission()`
  - **Setters**: `setName(String name)`
  - **Boolean methods**: `isValid()`, `hasItems()`, `canProcess()`
  - **Business logic**: `calculateTotal()`, `processOrder()`, `validateInput()`

### Variables
- Use camelCase, meaningful names:
  ```java
  // Good
  private String productName;
  private List<Product> activeProducts;

  // Bad
  private String pn;
  private List<Product> list1;
  ```

### Constants
- Use UPPER_SNAKE_CASE:
  ```java
  public static final int MAX_RETRY_ATTEMPTS = 3;
  private static final String DEFAULT_CURRENCY = "USD";
  ```

### Packages
- Use lowercase, singular nouns: `com.marketplace.domain`, `com.marketplace.application`

---

## Exception Handling

### Exception Hierarchy
```
RuntimeException
├── ValidationException (400 BAD_REQUEST)
├── ProductNotFoundException (404 NOT_FOUND)
├── DataAccessException (500 INTERNAL_SERVER_ERROR)
└── IllegalArgumentException (400 BAD_REQUEST)
```

### Best Practices

#### 1. Use Specific Exceptions
```java
// Good
if (product == null) {
    throw new ProductNotFoundException("Product not found with id: " + id);
}

// Bad
if (product == null) {
    throw new Exception("Error");
}
```

#### 2. Include Context in Exception Messages
```java
// Good
throw new ValidationException(
    "Invalid product data",
    List.of("Price must be positive", "Name cannot be empty")
);

// Bad
throw new ValidationException("Invalid data");
```

#### 3. Never Catch Generic Exceptions Unless Necessary
```java
// Good
try {
    processFile(file);
} catch (IOException e) {
    logger.error("Failed to read file: {}", file.getName(), e);
    throw new DataAccessException("File processing failed", e);
}

// Bad
try {
    processFile(file);
} catch (Exception e) {
    // Too broad
}
```

#### 4. Log and Rethrow or Handle, Never Both
```java
// Good - Handle
try {
    process();
} catch (IOException e) {
    logger.error("Processing failed", e);
    return defaultValue;
}

// Good - Rethrow
try {
    process();
} catch (IOException e) {
    throw new DataAccessException("Processing failed", e);
}

// Bad - Both
try {
    process();
} catch (IOException e) {
    logger.error("Error", e);
    throw e; // Already logged, creates duplicate logs
}
```

#### 5. Use try-with-resources
```java
// Good
try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
    return reader.readLine();
}

// Bad
BufferedReader reader = new BufferedReader(new FileReader(file));
try {
    return reader.readLine();
} finally {
    reader.close();
}
```

---

## Logging

### Log Levels
- **ERROR**: System errors, exceptions that prevent operation
- **WARN**: Unexpected situations that don't prevent operation
- **INFO**: Important business events (user actions, state changes)
- **DEBUG**: Detailed information for debugging
- **TRACE**: Very detailed information (rarely used in production)

### Best Practices

#### 1. Use SLF4J with Parameterized Logging
```java
// Good - Efficient, no string concatenation if debug is disabled
logger.debug("Processing product {} with price {}", productId, price);

// Bad - Always creates string even if logging is disabled
logger.debug("Processing product " + productId + " with price " + price);
```

#### 2. Log at Appropriate Levels
```java
// ERROR - System failures
logger.error("Failed to connect to database", exception);

// WARN - Validation failures, deprecated API usage
logger.warn("Product {} validation failed: {}", productId, errors);

// INFO - Business events
logger.info("Product {} created successfully by user {}", productId, userId);

// DEBUG - Method entry/exit, intermediate states
logger.debug("Starting product validation for id: {}", productId);
```

#### 3. Include Context
```java
// Good
logger.error("Failed to process order {} for user {}", orderId, userId, exception);

// Bad
logger.error("Processing failed", exception);
```

#### 4. Don't Log Sensitive Information
```java
// Bad
logger.info("User login: username={}, password={}", username, password);

// Good
logger.info("User login attempt: username={}", username);
```

#### 5. Use Static Logger Instance
```java
private static final Logger logger = LoggerFactory.getLogger(MyClass.class);
```

---

## Validation

### Input Validation

#### 1. Validate Early (Fail Fast)
```java
public Product createProduct(String name, double price) {
    // Validate at the beginning
    List<String> errors = new ArrayList<>();

    if (name == null || name.trim().isEmpty()) {
        errors.add("Product name cannot be null or empty");
    }

    if (price < 0) {
        errors.add("Price must be non-negative");
    }

    if (!errors.isEmpty()) {
        throw new ValidationException("Invalid product data", errors);
    }

    // Continue with business logic
    return new Product(name, price);
}
```

#### 2. Use Bean Validation Annotations (JSR-303)
```java
public class Product {
    @NotNull(message = "Product ID cannot be null")
    private String id;

    @NotBlank(message = "Product name cannot be blank")
    @Size(max = 255, message = "Product name cannot exceed 255 characters")
    private String name;

    @Min(value = 0, message = "Price must be non-negative")
    private double price;

    @Email(message = "Invalid email format")
    private String contactEmail;
}
```

#### 3. Validate at Domain Boundaries
- Controller layer: Format and structure validation
- Service layer: Business rule validation
- Domain entities: Invariant validation

#### 4. Return Meaningful Validation Messages
```java
// Good
"Product name must be between 3 and 255 characters"

// Bad
"Invalid input"
```

---

## Testing

### Test Organization
```
src/test/java/com/marketplace/
├── domain/           # Unit tests for entities
├── application/      # Unit tests for services
└── infrastructure/   # Integration tests for controllers
```

### Best Practices

#### 1. Use Descriptive Test Names
```java
// Good - Describes what is being tested and expected outcome
@Test
void shouldThrowExceptionWhenProductNotFound() {}

@Test
void shouldReturnAllProductsWhenRepositoryHasData() {}

// Bad
@Test
void test1() {}
```

#### 2. Follow AAA Pattern (Arrange, Act, Assert)
```java
@Test
void shouldCalculateTotalPriceCorrectly() {
    // Arrange
    Product product = new Product("1", "Test", 100.0);
    int quantity = 3;

    // Act
    double total = product.calculateTotal(quantity);

    // Assert
    assertEquals(300.0, total);
}
```

#### 3. Test One Thing Per Test
```java
// Good
@Test
void shouldValidateProductName() {
    // Tests only name validation
}

@Test
void shouldValidateProductPrice() {
    // Tests only price validation
}

// Bad
@Test
void shouldValidateProduct() {
    // Tests name, price, description, etc. all together
}
```

#### 4. Use Mocks Appropriately
```java
@Test
void shouldCreateProductSuccessfully() {
    // Mock external dependencies
    ProductRepository repository = Mockito.mock(ProductRepository.class);
    when(repository.save(any())).thenReturn(product);

    ProductService service = new ProductServiceImpl(repository);

    Product result = service.createProduct(productData);

    assertNotNull(result);
    verify(repository, times(1)).save(any());
}
```

#### 5. Test Edge Cases
```java
@Test
void shouldHandleNullInput() {}

@Test
void shouldHandleEmptyList() {}

@Test
void shouldHandleMaximumValue() {}

@Test
void shouldHandleNegativeValue() {}
```

---

## Spring Boot Specific

### Dependency Injection

#### 1. Use Constructor Injection (Recommended)
```java
// Good - Immutable, testable, clear dependencies
@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository repository;

    @Autowired
    public ProductServiceImpl(ProductRepository repository) {
        this.repository = repository;
    }
}

// Bad - Field injection
@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository repository; // Harder to test
}
```

#### 2. Use Interfaces for Service Contracts
```java
// Good
public interface ProductService {
    Product findById(String id);
}

@Service
public class ProductServiceImpl implements ProductService {
    @Override
    public Product findById(String id) {
        // Implementation
    }
}
```

### REST Controllers

#### 1. Use Appropriate HTTP Methods and Status Codes
```java
@RestController
@RequestMapping("/product")
public class ProductController {

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable String id) {
        return ResponseEntity.ok(product); // 200 OK
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.status(HttpStatus.CREATED).body(created); // 201 Created
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product product) {
        return ResponseEntity.ok(updated); // 200 OK
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}
```

#### 2. Use @ControllerAdvice for Global Exception Handling
```java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ProductNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse("PRODUCT_NOT_FOUND", ex.getMessage()));
    }
}
```

#### 3. Validate Request Bodies
```java
@PostMapping
public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
    // Spring automatically validates and returns 400 if invalid
}
```

### Configuration

#### 1. Use @ConfigurationProperties for Type-Safe Configuration
```java
@ConfigurationProperties(prefix = "app.cors")
@Component
public class CorsProperties {
    private List<String> allowedOrigins;
    private List<String> allowedMethods;

    // Getters and setters
}
```

#### 2. Use Profiles for Environment-Specific Configuration
```yaml
# application-dev.properties
server.port=8080
logging.level.root=DEBUG

# application-prod.properties
server.port=80
logging.level.root=WARN
```

---

## Security

### 1. Never Trust User Input
```java
// Validate and sanitize all inputs
public Product createProduct(@RequestBody Product product) {
    validateProduct(product);
    sanitizeInput(product);
    return productService.create(product);
}
```

### 2. Avoid Exposing Sensitive Information
```java
// Good - Generic error message to client
@ExceptionHandler(Exception.class)
public ResponseEntity<ErrorResponse> handleException(Exception ex) {
    logger.error("Unexpected error", ex); // Log detailed error
    return ResponseEntity.status(500)
        .body(new ErrorResponse("INTERNAL_ERROR", "An error occurred")); // Generic message
}

// Bad - Exposes stack trace to client
return ResponseEntity.status(500).body(ex.getMessage());
```

### 3. Use Parameterized Queries
```java
// Good
String query = "SELECT * FROM products WHERE id = ?";
jdbcTemplate.query(query, new Object[]{id}, rowMapper);

// Bad - SQL Injection risk
String query = "SELECT * FROM products WHERE id = " + id;
```

### 4. Implement Proper CORS Configuration
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins(allowedOrigins)
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowCredentials(true);
            }
        };
    }
}
```

---

## Performance

### 1. Use Appropriate Data Structures
```java
// Use ArrayList for sequential access
List<Product> products = new ArrayList<>();

// Use HashSet for unique items and fast lookup
Set<String> productIds = new HashSet<>();

// Use HashMap for key-value pairs
Map<String, Product> productCache = new HashMap<>();
```

### 2. Avoid Premature Optimization
- Write clean, readable code first
- Profile to identify bottlenecks
- Optimize only when necessary

### 3. Use Lazy Initialization When Appropriate
```java
public class ProductCache {
    private Map<String, Product> cache;

    public Map<String, Product> getCache() {
        if (cache == null) {
            cache = loadCache();
        }
        return cache;
    }
}
```

### 4. Close Resources Properly
```java
// Use try-with-resources
try (InputStream input = new FileInputStream(file);
     OutputStream output = new FileOutputStream(outputFile)) {
    // Use streams
}
```

### 5. Use StringBuilder for String Concatenation in Loops
```java
// Good
StringBuilder sb = new StringBuilder();
for (String item : items) {
    sb.append(item).append(",");
}

// Bad
String result = "";
for (String item : items) {
    result += item + ","; // Creates new String object each iteration
}
```

---

## Documentation

### 1. Write Javadoc for Public APIs
```java
/**
 * Retrieves a product by its unique identifier.
 *
 * @param id the unique identifier of the product
 * @return the product with the specified ID
 * @throws ProductNotFoundException if no product exists with the given ID
 * @throws IllegalArgumentException if the ID is null or empty
 */
public Product findById(String id) {
    // Implementation
}
```

### 2. Use Clear Comments for Complex Logic
```java
// Calculate discount based on customer tier
// Gold: 20%, Silver: 10%, Bronze: 5%
double discount = calculateTierDiscount(customer.getTier());
```

### 3. Avoid Obvious Comments
```java
// Bad
i++; // Increment i

// Good - No comment needed, code is self-explanatory
totalPrice = price * quantity;
```

### 4. Keep Comments Up-to-Date
- Remove obsolete comments
- Update comments when code changes

---

## Additional Best Practices

### 1. Use Optional for Nullable Returns
```java
// Good
public Optional<Product> findById(String id) {
    return Optional.ofNullable(productRepository.findById(id));
}

// Usage
productService.findById(id)
    .ifPresent(product -> process(product));

// Bad
public Product findById(String id) {
    return productRepository.findById(id); // Might return null
}
```

### 2. Use Enums for Fixed Sets of Constants
```java
// Good
public enum ProductStatus {
    ACTIVE, INACTIVE, DISCONTINUED
}

// Bad
public static final String STATUS_ACTIVE = "ACTIVE";
public static final String STATUS_INACTIVE = "INACTIVE";
```

### 3. Prefer Composition Over Inheritance
```java
// Good - Composition
public class ProductService {
    private final PriceCalculator calculator;
    private final InventoryManager inventory;
}

// Avoid deep inheritance hierarchies
```

### 4. Use Immutable Objects When Possible
```java
public final class Money {
    private final double amount;
    private final String currency;

    public Money(double amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

    // Only getters, no setters
    public double getAmount() { return amount; }
    public String getCurrency() { return currency; }
}
```

### 5. Follow SOLID Principles
- **S**ingle Responsibility: One class, one purpose
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Subtypes must be substitutable for base types
- **I**nterface Segregation: Many specific interfaces over one general
- **D**ependency Inversion: Depend on abstractions, not concretions

---

## Code Review Checklist

Before committing code, verify:
- [ ] Code follows naming conventions
- [ ] Proper exception handling implemented
- [ ] Logging added at appropriate levels
- [ ] Input validation implemented
- [ ] Unit tests written and passing
- [ ] No sensitive information logged or exposed
- [ ] Resources properly closed
- [ ] Javadoc added for public APIs
- [ ] No compiler warnings
- [ ] Code is readable and maintainable

---

## References
- [Effective Java (3rd Edition) by Joshua Bloch](https://www.oracle.com/java/technologies/effective-java.html)
- [Clean Code by Robert C. Martin](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- [Spring Boot Best Practices](https://spring.io/guides)
- [Java Code Conventions](https://www.oracle.com/java/technologies/javase/codeconventions-contents.html)
