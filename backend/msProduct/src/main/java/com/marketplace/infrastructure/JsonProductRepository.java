package com.marketplace.infrastructure;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.marketplace.domain.Product;
import com.marketplace.domain.ProductRepository;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class JsonProductRepository implements ProductRepository {
    private final String dataFile;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public JsonProductRepository() {
        this.dataFile = "src/main/resources/products.json";
    }

    // Constructor for testing
    public JsonProductRepository(String dataFile) {
        this.dataFile = dataFile;
    }

    @Override
    public List<Product> findAll() {
        try {
            File file = new File(dataFile);
            if (!file.exists() || file.length() == 0) return new ArrayList<>();
            return objectMapper.readValue(file, new TypeReference<List<Product>>() {});
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Product findById(String id) {
        return findAll().stream().filter(p -> p.getId().equals(id)).findFirst().orElse(null);
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
            throw new RuntimeException(e);
        }
    }
} 