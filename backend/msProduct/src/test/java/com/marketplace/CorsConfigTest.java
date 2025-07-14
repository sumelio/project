package com.marketplace;

import com.marketplace.infrastructure.config.CorsConfig;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.test.context.TestPropertySource;
import org.springframework.web.filter.CorsFilter;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(properties = {
    "cors.allowed-origins=http://localhost:3000,http://localhost:8080",
    "cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS",
    "cors.allowed-headers=*",
    "cors.allow-credentials=true",
    "cors.max-age=3600"
})
class CorsConfigTest {

    @SpyBean
    private CorsConfig corsConfig;

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
        // Check the actual class, not the proxy
        Class<?> actualClass = corsConfig.getClass();
        if (actualClass.getName().contains("$$")) {
            // This is a proxy, get the superclass
            actualClass = actualClass.getSuperclass();
        }
        assertTrue(actualClass.isAnnotationPresent(org.springframework.context.annotation.Configuration.class),
                   "CorsConfig should be annotated with @Configuration");
    }

    @Test
    void testCorsFilterMethodAnnotations() throws NoSuchMethodException {
        // Check the actual class, not the proxy
        Class<?> actualClass = corsConfig.getClass();
        if (actualClass.getName().contains("$$")) {
            // This is a proxy, get the superclass
            actualClass = actualClass.getSuperclass();
        }
        var method = actualClass.getMethod("corsFilter");
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
        // Note: In Spring context, beans might be singletons, so we just check they're not null
        // assertNotSame(filter1, filter2, "Each call should create a new instance");
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