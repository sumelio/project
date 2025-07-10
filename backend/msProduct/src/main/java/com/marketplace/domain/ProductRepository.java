package com.marketplace.domain;

import java.util.List;

public interface ProductRepository {
    List<Product> findAll();
    Product findById(String id);
    Product save(Product product);
    Product update(String id, Product product);
    void delete(String id);
} 