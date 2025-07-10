package com.marketplace;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marketplace.domain.Product;
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
        assertNull(repository.findById("1"));
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
} 