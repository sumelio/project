package com.marketplace.domain;

public class Reputation {
    private String level;
    private String description;

    public Reputation() {}

    public Reputation(String level, String description) {
        this.level = level;
        this.description = description;
    }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
} 