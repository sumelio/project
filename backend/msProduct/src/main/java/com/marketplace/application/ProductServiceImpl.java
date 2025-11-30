package com.marketplace.application;

import com.marketplace.domain.Product;
import com.marketplace.domain.ProductRepository;
import com.marketplace.domain.exceptions.ProductNotFoundException;
import com.marketplace.domain.exceptions.ValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Implementation of the ProductService interface.
 * Provides business logic for managing marketplace products.
 */
@Service
public class ProductServiceImpl implements ProductService {
    private static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Retrieves all products from the repository.
     *
     * @return list of all products in the marketplace
     */
    @Override
    public List<Product> getAllProducts() {
        logger.debug("Retrieving all products");
        List<Product> products = productRepository.findAll();
        logger.info("Retrieved {} products", products.size());
        return products;
    }

    /**
     * Retrieves a product by its unique identifier.
     *
     * @param id the unique identifier of the product
     * @return the product with the specified ID
     * @throws ProductNotFoundException if no product exists with the given ID
     * @throws IllegalArgumentException if the ID is null or empty
     */
    @Override
    public Product getProductById(String id) {
        logger.debug("Retrieving product with id: {}", id);

        if (id == null || id.isEmpty()) {
            logger.warn("Attempted to retrieve product with null or empty id");
            throw new IllegalArgumentException("Product ID cannot be null or empty");
        }

        Product product = productRepository.findById(id);

        if (product == null) {
            logger.warn("Product not found with id: {}", id);
            throw new ProductNotFoundException("Product not found with id: " + id);
        }

        logger.info("Successfully retrieved product with id: {}", id);
        return product;
    }

    /**
     * Creates a new product in the repository.
     *
     * @param product the product to create
     * @return the created product
     * @throws ValidationException if the product data is invalid
     */
    @Override
    public Product createProduct(Product product) {
        logger.debug("Creating new product with id: {}", product != null ? product.getId() : "null");

        validateProduct(product);

        Product createdProduct = productRepository.save(product);
        logger.info("Successfully created product with id: {}", createdProduct.getId());

        return createdProduct;
    }

    /**
     * Updates an existing product in the repository.
     *
     * @param id the unique identifier of the product to update
     * @param product the updated product data
     * @return the updated product
     * @throws ProductNotFoundException if no product exists with the given ID
     * @throws ValidationException if the product data is invalid
     * @throws IllegalArgumentException if the ID is null or empty
     */
    @Override
    public Product updateProduct(String id, Product product) {
        logger.debug("Updating product with id: {}", id);

        if (id == null || id.isEmpty()) {
            logger.warn("Attempted to update product with null or empty id");
            throw new IllegalArgumentException("Product ID cannot be null or empty");
        }

        // Verify product exists
        Product existingProduct = productRepository.findById(id);
        if (existingProduct == null) {
            logger.warn("Cannot update product - not found with id: {}", id);
            throw new ProductNotFoundException("Product not found with id: " + id);
        }

        validateProduct(product);

        Product updatedProduct = productRepository.update(id, product);
        logger.info("Successfully updated product with id: {}", id);

        return updatedProduct;
    }

    /**
     * Deletes a product from the repository.
     *
     * @param id the unique identifier of the product to delete
     * @throws ProductNotFoundException if no product exists with the given ID
     * @throws IllegalArgumentException if the ID is null or empty
     */
    @Override
    public void deleteProduct(String id) {
        logger.debug("Deleting product with id: {}", id);

        if (id == null || id.isEmpty()) {
            logger.warn("Attempted to delete product with null or empty id");
            throw new IllegalArgumentException("Product ID cannot be null or empty");
        }

        // Verify product exists before deletion
        Product existingProduct = productRepository.findById(id);
        if (existingProduct == null) {
            logger.warn("Cannot delete product - not found with id: {}", id);
            throw new ProductNotFoundException("Product not found with id: " + id);
        }

        productRepository.delete(id);
        logger.info("Successfully deleted product with id: {}", id);
    }

    /**
     * Validates product data.
     * Collects all validation errors and throws a ValidationException if any are found.
     *
     * @param product the product to validate
     * @throws ValidationException if validation fails
     */
    private void validateProduct(Product product) {
        List<String> errors = new ArrayList<>();

        if (product == null) {
            throw new IllegalArgumentException("Product cannot be null");
        }

        if (product.getId() == null || product.getId().isEmpty()) {
            errors.add("Product ID cannot be null or empty");
        }

        if (product.getTitle() == null || product.getTitle().isEmpty()) {
            errors.add("Product title cannot be null or empty");
        }

        if (product.getDescription() == null || product.getDescription().isEmpty()) {
            errors.add("Product description cannot be null or empty");
        }

        if (product.getPrice() == null || product.getPrice().isEmpty()) {
            errors.add("Product price cannot be null or empty");
        }

        if (product.getPaymentMethods() == null || product.getPaymentMethods().isEmpty()) {
            errors.add("Product payment methods cannot be null or empty");
        }

        if (product.getSellerInformation() == null) {
            errors.add("Product seller information cannot be null");
        }

        if (product.getAdditionalDetails() == null) {
            errors.add("Product additional details cannot be null");
        }

        if (!errors.isEmpty()) {
            logger.warn("Product validation failed with {} errors for product id: {}",
                errors.size(), product.getId());
            throw new ValidationException("Invalid product data", errors);
        }
    }
} 