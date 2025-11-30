package com.marketplace.domain;

import com.marketplace.domain.exceptions.ValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public class Metrics {
    private static final Logger logger = LoggerFactory.getLogger(Metrics.class);
    private String sales;
    private String service;
    private String delivery;

    public Metrics() {}

    public Metrics(String sales, String service, String delivery) {
        logger.debug("Creating Metrics instance with sales: {}, service: {}, delivery: {}", sales, service, delivery);
        this.sales = sales;
        this.service = service;
        this.delivery = delivery;
        logger.debug("Metrics instance created successfully");
    }

    public String getSales() { return sales; }
    public void setSales(String sales) { this.sales = sales; }

    public String getService() { return service; }
    public void setService(String service) { this.service = service; }

    public String getDelivery() { return delivery; }
    public void setDelivery(String delivery) { this.delivery = delivery; }
} 