package com.marketplace.infrastructure;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.marketplace.domain.Product;
import com.marketplace.domain.ProductRepository;
import com.marketplace.domain.exceptions.DataAccessException;
import com.marketplace.domain.exceptions.ProductNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class JsonProductRepository implements ProductRepository {
    private final String dataFile;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public JsonProductRepository(@Value("${app.data.file:products.json}") String dataFile) {
        this.dataFile = dataFile;
    }

    @Override
    public List<Product> findAll() {
        try {

            File file = new File(this.dataFile);
            if (!file.exists() || file.length() == 0) {
                file = new File("./src/main/resources/products.json");
            }

            if (!file.exists() || file.length() == 0) return new ArrayList<>();
            return objectMapper.readValue(file, new TypeReference<List<Product>>() {});
        } catch (IOException e) {
            throw new DataAccessException("Failed to read products from file: " + dataFile, e);
        }
    }

    @Override
    public Product findById(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("Product ID cannot be null or empty");
        }
        
        Product product = findAll().stream()
            .filter(p -> p.getId().equals(id))
            .findFirst()
            .orElse(null);
            
        if (product == null) {
            throw new ProductNotFoundException(id);
        }
        
        return product;
    }

    @Override
    public Product save(Product product) {
        List<Product> products = findAll();
        products.add(product);
        writeProducts(products);
        return product;
    }

    @Override
    public Product update(String id, Product product) {
        List<Product> products = findAll();
        for (int i = 0; i < products.size(); i++) {
            if (products.get(i).getId().equals(id)) {
                products.set(i, product);
                writeProducts(products);
                return product;
            }
        }
        return null;
    }

    @Override
    public void delete(String id) {
        List<Product> products = findAll();
        products.removeIf(p -> p.getId().equals(id));
        writeProducts(products);
    }

    private void writeProducts(List<Product> products) {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File(dataFile), products);
        } catch (IOException e) {
            throw new DataAccessException("Failed to write products to file: " + dataFile, e);
        }
    }
} 