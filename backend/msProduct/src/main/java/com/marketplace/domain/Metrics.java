package com.marketplace.domain;

import com.marketplace.domain.exceptions.ValidationException;

import java.util.ArrayList;
import java.util.List;

public class Metrics {
    private String sales;
    private String service;
    private String delivery;

    public Metrics() {}

    public Metrics(String sales, String service, String delivery) {
        this.sales = sales;
        this.service = service;
        this.delivery = delivery;
    }

    public String getSales() { return sales; }
    public void setSales(String sales) { this.sales = sales; }

    public String getService() { return service; }
    public void setService(String service) { this.service = service; }

    public String getDelivery() { return delivery; }
    public void setDelivery(String delivery) { this.delivery = delivery; }
} 