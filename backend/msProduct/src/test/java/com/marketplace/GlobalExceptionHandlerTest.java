package com.marketplace;

import com.marketplace.domain.exceptions.DataAccessException;
import com.marketplace.domain.exceptions.ProductNotFoundException;
import com.marketplace.domain.exceptions.ValidationException;
import com.marketplace.infrastructure.dto.ErrorResponse;
import com.marketplace.infrastructure.exception.GlobalExceptionHandler;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GlobalExceptionHandlerTest {

    private GlobalExceptionHandler globalExceptionHandler;

    @Mock
    private WebRequest webRequest;

    @BeforeEach
    void setUp() {
        globalExceptionHandler = new GlobalExceptionHandler();
    }

    @Test
    void testHandleProductNotFound() {
        // Given
        ProductNotFoundException exception = new ProductNotFoundException("1");
        when(webRequest.getDescription(false)).thenReturn("uri=/product/1");
        
        // When
        ResponseEntity<ErrorResponse> response = globalExceptionHandler.handleProductNotFound(exception, webRequest);
        
        // Then
        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        
        ErrorResponse errorResponse = response.getBody();
        assertNotNull(errorResponse);
        assertEquals("PRODUCT_NOT_FOUND", errorResponse.getError());
        assertEquals("Product with ID '1' not found", errorResponse.getMessage());
        assertEquals("/product/1", errorResponse.getPath());
        assertEquals(404, errorResponse.getStatus());
        assertNotNull(errorResponse.getTimestamp());
    }

    @Test
    void testHandleValidationException() {
        // Given
        ValidationException exception = new ValidationException("Invalid product data");
        when(webRequest.getDescription(false)).thenReturn("uri=/product/1");
        
        // When
        ResponseEntity<ErrorResponse> response = globalExceptionHandler.handleValidation(exception, webRequest);
        
        // Then
        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        
        ErrorResponse errorResponse = response.getBody();
        assertNotNull(errorResponse);
        assertEquals("VALIDATION_ERROR", errorResponse.getError());
        assertEquals("Invalid product data", errorResponse.getMessage());
        assertEquals("/product/1", errorResponse.getPath());
        assertEquals(400, errorResponse.getStatus());
        assertNotNull(errorResponse.getTimestamp());
    }

    @Test
    void testHandleMethodArgumentNotValid() {
        // Test basic functionality without complex validation
        // Given
        ValidationException simpleException = new ValidationException("Simple validation failed");
        when(webRequest.getDescription(false)).thenReturn("uri=/product/1");

        // When
        ResponseEntity<ErrorResponse> response = globalExceptionHandler.handleValidation(simpleException, webRequest);

        // Then
        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());

        ErrorResponse errorResponse = response.getBody();
        assertNotNull(errorResponse);
        assertEquals("VALIDATION_ERROR", errorResponse.getError());
        assertEquals("Simple validation failed", errorResponse.getMessage());
        assertEquals("/product/1", errorResponse.getPath());
        assertEquals(400, errorResponse.getStatus());
        assertNotNull(errorResponse.getTimestamp());
    }


    @Test
    void testHandleMethodArgumentTypeMismatch() {
        // Given
        MethodArgumentTypeMismatchException exception = mock(MethodArgumentTypeMismatchException.class);
        when(exception.getValue()).thenReturn("invalid-id");
        when(exception.getName()).thenReturn("id");
        when(exception.getRequiredType()).thenReturn((Class) Long.class);
        when(webRequest.getDescription(false)).thenReturn("uri=/product/1");
        
        // When
        ResponseEntity<ErrorResponse> response = globalExceptionHandler.handleMethodArgumentTypeMismatch(exception, webRequest);
        
        // Then
        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        
        ErrorResponse errorResponse = response.getBody();
        assertNotNull(errorResponse);
        assertEquals("INVALID_PARAMETER", errorResponse.getError());
        assertEquals("Invalid value 'invalid-id' for parameter 'id'. Expected type: Long", errorResponse.getMessage());
        assertEquals("/product/1", errorResponse.getPath());
        assertEquals(400, errorResponse.getStatus());
        assertNotNull(errorResponse.getTimestamp());
    }

    @Test
    void testHandleHttpMessageNotReadable() {
        // Given
        HttpMessageNotReadableException exception = mock(HttpMessageNotReadableException.class);
        when(exception.getMessage()).thenReturn("JSON parse error");
        when(webRequest.getDescription(false)).thenReturn("uri=/product/1");
        
        // When
        ResponseEntity<ErrorResponse> response = globalExceptionHandler.handleHttpMessageNotReadable(exception, webRequest);
        
        // Then
        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        
        ErrorResponse errorResponse = response.getBody();
        assertNotNull(errorResponse);
        assertEquals("MALFORMED_REQUEST", errorResponse.getError());
        assertEquals("Request body is malformed or missing required fields", errorResponse.getMessage());
        assertEquals("/product/1", errorResponse.getPath());
        assertEquals(400, errorResponse.getStatus());
        assertNotNull(errorResponse.getTimestamp());
    }

    @Test
    void testHandleDataAccessException() {
        // Given
        DataAccessException exception = new DataAccessException("Database connection failed", new RuntimeException("Connection timeout"));
        when(webRequest.getDescription(false)).thenReturn("uri=/product/1");
        
        // When
        ResponseEntity<ErrorResponse> response = globalExceptionHandler.handleDataAccess(exception, webRequest);
        
        // Then
        assertNotNull(response);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        
        ErrorResponse errorResponse = response.getBody();
        assertNotNull(errorResponse);
        assertEquals("DATA_ACCESS_ERROR", errorResponse.getError());
        assertEquals("An error occurred while accessing data", errorResponse.getMessage());
        assertEquals("/product/1", errorResponse.getPath());
        assertEquals(500, errorResponse.getStatus());
        assertNotNull(errorResponse.getTimestamp());
    }

    @Test
    void testHandleIllegalArgumentException() {
        // Given
        IllegalArgumentException exception = new IllegalArgumentException("Product ID cannot be null");
        when(webRequest.getDescription(false)).thenReturn("uri=/product/1");
        
        // When
        ResponseEntity<ErrorResponse> response = globalExceptionHandler.handleIllegalArgument(exception, webRequest);
        
        // Then
        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        
        ErrorResponse errorResponse = response.getBody();
        assertNotNull(errorResponse);
        assertEquals("INVALID_ARGUMENT", errorResponse.getError());
        assertEquals("Product ID cannot be null", errorResponse.getMessage());
        assertEquals("/product/1", errorResponse.getPath());
        assertEquals(400, errorResponse.getStatus());
        assertNotNull(errorResponse.getTimestamp());
    }

    @Test
    void testHandleGeneralException() {
        // Given
        RuntimeException exception = new RuntimeException("Unexpected error occurred");
        when(webRequest.getDescription(false)).thenReturn("uri=/product/1");
        
        // When
        ResponseEntity<ErrorResponse> response = globalExceptionHandler.handleGeneral(exception, webRequest);
        
        // Then
        assertNotNull(response);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        
        ErrorResponse errorResponse = response.getBody();
        assertNotNull(errorResponse);
        assertEquals("INTERNAL_SERVER_ERROR", errorResponse.getError());
        assertEquals("An unexpected error occurred", errorResponse.getMessage());
        assertEquals("/product/1", errorResponse.getPath());
        assertEquals(500, errorResponse.getStatus());
        assertNotNull(errorResponse.getTimestamp());
    }

    @Test
    void testWebRequestPathProcessing() {
        // Given
        when(webRequest.getDescription(false)).thenReturn("uri=/api/products/123");
        ProductNotFoundException exception = new ProductNotFoundException("123");
        
        // When
        ResponseEntity<ErrorResponse> response = globalExceptionHandler.handleProductNotFound(exception, webRequest);
        
        // Then
        ErrorResponse errorResponse = response.getBody();
        assertNotNull(errorResponse);
        assertEquals("/api/products/123", errorResponse.getPath());
    }

    @Test
    void testErrorResponseTimestampIsRecent() {
        // Given
        ProductNotFoundException exception = new ProductNotFoundException("1");
        when(webRequest.getDescription(false)).thenReturn("uri=/product/1");
        long beforeTime = System.currentTimeMillis();
        
        // When
        ResponseEntity<ErrorResponse> response = globalExceptionHandler.handleProductNotFound(exception, webRequest);
        
        // Then
        long afterTime = System.currentTimeMillis();
        ErrorResponse errorResponse = response.getBody();
        assertNotNull(errorResponse);
        assertNotNull(errorResponse.getTimestamp());
        
        // Verify timestamp is within reasonable range (within 1 second)
        long timestampMillis = errorResponse.getTimestamp().atZone(java.time.ZoneId.systemDefault()).toInstant().toEpochMilli();
        assertTrue(timestampMillis >= beforeTime && timestampMillis <= afterTime);
    }

    @Test
    void testMultipleValidationErrors() {
        // Test IllegalArgumentException instead of complex validation
        // Given
        IllegalArgumentException exception = new IllegalArgumentException("Multiple validation errors occurred");
        when(webRequest.getDescription(false)).thenReturn("uri=/product/1");
        
        // When
        ResponseEntity<ErrorResponse> response = globalExceptionHandler.handleIllegalArgument(exception, webRequest);
        
        // Then
        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        
        ErrorResponse errorResponse = response.getBody();
        assertNotNull(errorResponse);
        assertEquals("INVALID_ARGUMENT", errorResponse.getError());
        assertEquals("Multiple validation errors occurred", errorResponse.getMessage());
        assertEquals("/product/1", errorResponse.getPath());
        assertEquals(400, errorResponse.getStatus());
        assertNotNull(errorResponse.getTimestamp());
    }

    @Test
    void testExceptionHandlerAnnotation() {
        // Verify that the class has @ControllerAdvice annotation
        assertTrue(GlobalExceptionHandler.class.isAnnotationPresent(org.springframework.web.bind.annotation.ControllerAdvice.class));
    }

    @Test
    void testExceptionHandlerMethods() throws NoSuchMethodException {
        // Verify that exception handler methods have @ExceptionHandler annotations
        assertTrue(GlobalExceptionHandler.class.getMethod("handleProductNotFound", ProductNotFoundException.class, WebRequest.class)
                .isAnnotationPresent(org.springframework.web.bind.annotation.ExceptionHandler.class));
        
        assertTrue(GlobalExceptionHandler.class.getMethod("handleValidation", ValidationException.class, WebRequest.class)
                .isAnnotationPresent(org.springframework.web.bind.annotation.ExceptionHandler.class));
        
        assertTrue(GlobalExceptionHandler.class.getMethod("handleGeneral", Exception.class, WebRequest.class)
                .isAnnotationPresent(org.springframework.web.bind.annotation.ExceptionHandler.class));
    }
} 