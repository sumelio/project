package com.marketplace;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marketplace.domain.Product;
import com.marketplace.domain.exceptions.ProductNotFoundException;
import com.marketplace.infrastructure.JsonProductRepository;
import org.junit.jupiter.api.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class JsonProductRepositoryTest {
    private JsonProductRepository repository;
    private static File tempFile;

    @BeforeAll
    static void setUpAll() throws IOException {
        tempFile = File.createTempFile("products-test", ".json");
    }

    @AfterAll
    static void tearDownAll() {
        if(tempFile.exists()) {
            tempFile.delete();
        }
    }

    @BeforeEach
    void setUp() throws IOException {
        // Clear the file before each test
        Files.write(tempFile.toPath(), "[]".getBytes());
        repository = new JsonProductRepository(tempFile.getAbsolutePath());
    }

    @Test
    void testFindAllEmpty() {
        List<Product> products = repository.findAll();
        assertNotNull(products);
        assertTrue(products.isEmpty());
    }

    @Test
    void testSaveAndFindById() {
        Product product = new Product();
        product.setId("1");
        repository.save(product);
        Product found = repository.findById("1");
        assertNotNull(found);
        assertEquals("1", found.getId());
    }

    @Test
    void testUpdate() {
        Product product = new Product();
        product.setId("1");
        repository.save(product);
        product.setTitle("Updated");
        repository.update("1", product);
        Product found = repository.findById("1");
        assertEquals("Updated", found.getTitle());
    }

    @Test
    void testDelete() {
        Product product = new Product();
        product.setId("1");
        repository.save(product);
        repository.delete("1");
        // After deletion, findById should throw ProductNotFoundException
        assertThrows(ProductNotFoundException.class, () -> repository.findById("1"));
    }

    @Test
    void testIOExceptionOnFindAll() {
        // Make file unreadable
        tempFile.setReadable(false);
        JsonProductRepository badRepo = new JsonProductRepository(tempFile.getAbsolutePath());
        assertThrows(RuntimeException.class, badRepo::findAll);
        // Restore permissions
        tempFile.setReadable(true);
    }

    @Test
    void testFindByIdWithNullId() {
        // Test null ID validation
        assertThrows(IllegalArgumentException.class, () -> repository.findById(null));
    }

    @Test
    void testFindByIdWithEmptyId() {
        // Test empty ID validation
        assertThrows(IllegalArgumentException.class, () -> repository.findById(""));
    }

    @Test
    void testFindByIdWithWhitespaceId() {
        // Test whitespace-only ID validation
        assertThrows(IllegalArgumentException.class, () -> repository.findById("   "));
    }

    @Test
    void testFindAllWithNonExistentFile() throws IOException {
        // Create repository with non-existent file path
        File nonExistentFile = new File("non-existent-file-" + System.currentTimeMillis() + ".json");
        JsonProductRepository repoWithNonExistentFile = new JsonProductRepository(nonExistentFile.getAbsolutePath());

        // When file doesn't exist, it falls back to ./src/main/resources/products.json
        // which exists and has data, so we should get products
        List<Product> products = repoWithNonExistentFile.findAll();
        assertNotNull(products);
        // The fallback file exists and has data
        assertFalse(products.isEmpty());
    }

    @Test
    void testUpdateNonExistentProduct() {
        Product product = new Product();
        product.setId("999");
        product.setTitle("Non-existent");

        // Update should return null for non-existent product
        Product result = repository.update("999", product);
        assertNull(result);
    }
} 