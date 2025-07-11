package com.marketplace;

import com.marketplace.infrastructure.config.CorsConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.filter.CorsFilter;

import static org.junit.jupiter.api.Assertions.*;

class CorsConfigTest {

    private CorsConfig corsConfig;

    @BeforeEach
    void setUp() {
        corsConfig = new CorsConfig();
    }

    @Test
    void testCorsFilterBeanCreation() {
        CorsFilter corsFilter = corsConfig.corsFilter();
        assertNotNull(corsFilter, "CorsFilter bean should not be null");
    }

    @Test
    void testCorsConfigurationInstance() {
        CorsFilter corsFilter = corsConfig.corsFilter();
        assertNotNull(corsFilter, "CorsFilter should be created successfully");
        assertTrue(corsFilter instanceof CorsFilter, "Should be instance of CorsFilter");
    }

    @Test
    void testCorsConfigClassAnnotations() {
        assertTrue(corsConfig.getClass().isAnnotationPresent(org.springframework.context.annotation.Configuration.class),
                   "CorsConfig should be annotated with @Configuration");
    }

    @Test
    void testCorsFilterMethodAnnotations() throws NoSuchMethodException {
        var method = corsConfig.getClass().getMethod("corsFilter");
        assertTrue(method.isAnnotationPresent(org.springframework.context.annotation.Bean.class),
                   "corsFilter method should be annotated with @Bean");
    }

    @Test
    void testCorsFilterReturnType() throws NoSuchMethodException {
        var method = corsConfig.getClass().getMethod("corsFilter");
        assertEquals(CorsFilter.class, method.getReturnType(),
                     "corsFilter method should return CorsFilter type");
    }

    @Test
    void testMultipleCorsFilterInstances() {
        CorsFilter filter1 = corsConfig.corsFilter();
        CorsFilter filter2 = corsConfig.corsFilter();
        
        assertNotNull(filter1, "First filter should not be null");
        assertNotNull(filter2, "Second filter should not be null");
        assertNotSame(filter1, filter2, "Each call should create a new instance");
    }

    @Test
    void testCorsConfigConstructor() {
        CorsConfig config = new CorsConfig();
        assertNotNull(config, "CorsConfig instance should not be null");
    }

    @Test
    void testCorsFilterIsNotNull() {
        assertNotNull(corsConfig.corsFilter(), "CorsFilter should never be null");
    }

    @Test
    void testCorsFilterCreationConsistency() {
        // Test that the method consistently creates valid CorsFilter instances
        for (int i = 0; i < 5; i++) {
            CorsFilter filter = corsConfig.corsFilter();
            assertNotNull(filter, "CorsFilter should not be null on iteration " + i);
            assertTrue(filter instanceof CorsFilter, "Should be CorsFilter instance on iteration " + i);
        }
    }
} 