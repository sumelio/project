package com.marketplace;

import com.marketplace.infrastructure.dto.ErrorResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ErrorResponseTest {

    private ErrorResponse errorResponse;

    @BeforeEach
    void setUp() {
        errorResponse = new ErrorResponse();
    }

    @Test
    void testDefaultConstructor() {
        // Given & When
        ErrorResponse response = new ErrorResponse();
        
        // Then
        assertNotNull(response);
        assertNotNull(response.getTimestamp());
        assertNull(response.getError());
        assertNull(response.getMessage());
        assertNull(response.getPath());
        assertEquals(0, response.getStatus());
        assertNull(response.getValidationErrors());
    }

    @Test
    void testConstructorWithErrorAndMessage() {
        // Given
        String error = "VALIDATION_ERROR";
        String message = "Invalid input data";
        
        // When
        ErrorResponse response = new ErrorResponse(error, message);
        
        // Then
        assertNotNull(response);
        assertEquals(error, response.getError());
        assertEquals(message, response.getMessage());
        assertNotNull(response.getTimestamp());
        assertNull(response.getPath());
        assertEquals(0, response.getStatus());
        assertNull(response.getValidationErrors());
    }

    @Test
    void testConstructorWithAllParameters() {
        // Given
        String error = "PRODUCT_NOT_FOUND";
        String message = "Product not found with ID: 123";
        String path = "/product/123";
        int status = 404;
        
        // When
        ErrorResponse response = new ErrorResponse(error, message, path, status);
        
        // Then
        assertNotNull(response);
        assertEquals(error, response.getError());
        assertEquals(message, response.getMessage());
        assertEquals(path, response.getPath());
        assertEquals(status, response.getStatus());
        assertNotNull(response.getTimestamp());
        assertNull(response.getValidationErrors());
    }

    @Test
    void testTimestampIsSetOnCreation() {
        // Given
        LocalDateTime before = LocalDateTime.now();
        
        // When
        ErrorResponse response = new ErrorResponse();
        
        // Then
        LocalDateTime after = LocalDateTime.now();
        assertNotNull(response.getTimestamp());
        assertTrue(response.getTimestamp().isAfter(before) || response.getTimestamp().isEqual(before));
        assertTrue(response.getTimestamp().isBefore(after) || response.getTimestamp().isEqual(after));
    }

    @Test
    void testErrorGetterAndSetter() {
        // Given
        String error = "INTERNAL_SERVER_ERROR";
        
        // When
        errorResponse.setError(error);
        
        // Then
        assertEquals(error, errorResponse.getError());
    }

    @Test
    void testMessageGetterAndSetter() {
        // Given
        String message = "An unexpected error occurred";
        
        // When
        errorResponse.setMessage(message);
        
        // Then
        assertEquals(message, errorResponse.getMessage());
    }

    @Test
    void testPathGetterAndSetter() {
        // Given
        String path = "/api/products/456";
        
        // When
        errorResponse.setPath(path);
        
        // Then
        assertEquals(path, errorResponse.getPath());
    }

    @Test
    void testStatusGetterAndSetter() {
        // Given
        int status = 500;
        
        // When
        errorResponse.setStatus(status);
        
        // Then
        assertEquals(status, errorResponse.getStatus());
    }

    @Test
    void testTimestampGetterAndSetter() {
        // Given
        LocalDateTime timestamp = LocalDateTime.of(2023, 12, 25, 10, 30, 45);
        
        // When
        errorResponse.setTimestamp(timestamp);
        
        // Then
        assertEquals(timestamp, errorResponse.getTimestamp());
    }

    @Test
    void testValidationErrorsGetterAndSetter() {
        // Given
        List<ErrorResponse.ValidationError> validationErrors = new ArrayList<>();
        validationErrors.add(new ErrorResponse.ValidationError("title", "Title is required", null));
        validationErrors.add(new ErrorResponse.ValidationError("price", "Price must be positive", "-10"));
        
        // When
        errorResponse.setValidationErrors(validationErrors);
        
        // Then
        assertEquals(validationErrors, errorResponse.getValidationErrors());
        assertEquals(2, errorResponse.getValidationErrors().size());
    }

    @Test
    void testSetNullValues() {
        // Given
        errorResponse.setError("SOME_ERROR");
        errorResponse.setMessage("Some message");
        errorResponse.setPath("/some/path");
        errorResponse.setStatus(400);
        
        // When
        errorResponse.setError(null);
        errorResponse.setMessage(null);
        errorResponse.setPath(null);
        errorResponse.setValidationErrors(null);
        
        // Then
        assertNull(errorResponse.getError());
        assertNull(errorResponse.getMessage());
        assertNull(errorResponse.getPath());
        assertNull(errorResponse.getValidationErrors());
        assertEquals(400, errorResponse.getStatus()); // Status should remain unchanged
    }

    @Test
    void testValidationErrorDefaultConstructor() {
        // Given & When
        ErrorResponse.ValidationError validationError = new ErrorResponse.ValidationError();
        
        // Then
        assertNotNull(validationError);
        assertNull(validationError.getField());
        assertNull(validationError.getMessage());
        assertNull(validationError.getRejectedValue());
    }

    @Test
    void testValidationErrorConstructorWithAllParameters() {
        // Given
        String field = "email";
        String message = "Invalid email format";
        Object rejectedValue = "invalid-email";
        
        // When
        ErrorResponse.ValidationError validationError = new ErrorResponse.ValidationError(field, message, rejectedValue);
        
        // Then
        assertNotNull(validationError);
        assertEquals(field, validationError.getField());
        assertEquals(message, validationError.getMessage());
        assertEquals(rejectedValue, validationError.getRejectedValue());
    }

    @Test
    void testValidationErrorFieldGetterAndSetter() {
        // Given
        ErrorResponse.ValidationError validationError = new ErrorResponse.ValidationError();
        String field = "username";
        
        // When
        validationError.setField(field);
        
        // Then
        assertEquals(field, validationError.getField());
    }

    @Test
    void testValidationErrorMessageGetterAndSetter() {
        // Given
        ErrorResponse.ValidationError validationError = new ErrorResponse.ValidationError();
        String message = "Username must be at least 3 characters";
        
        // When
        validationError.setMessage(message);
        
        // Then
        assertEquals(message, validationError.getMessage());
    }

    @Test
    void testValidationErrorRejectedValueGetterAndSetter() {
        // Given
        ErrorResponse.ValidationError validationError = new ErrorResponse.ValidationError();
        Object rejectedValue = "ab";
        
        // When
        validationError.setRejectedValue(rejectedValue);
        
        // Then
        assertEquals(rejectedValue, validationError.getRejectedValue());
    }

    @Test
    void testValidationErrorWithNullValues() {
        // Given
        ErrorResponse.ValidationError validationError = new ErrorResponse.ValidationError("field", "message", "value");
        
        // When
        validationError.setField(null);
        validationError.setMessage(null);
        validationError.setRejectedValue(null);
        
        // Then
        assertNull(validationError.getField());
        assertNull(validationError.getMessage());
        assertNull(validationError.getRejectedValue());
    }

    @Test
    void testValidationErrorWithDifferentRejectedValueTypes() {
        // Given
        ErrorResponse.ValidationError stringError = new ErrorResponse.ValidationError();
        ErrorResponse.ValidationError intError = new ErrorResponse.ValidationError();
        ErrorResponse.ValidationError booleanError = new ErrorResponse.ValidationError();
        
        // When
        stringError.setRejectedValue("string value");
        intError.setRejectedValue(123);
        booleanError.setRejectedValue(true);
        
        // Then
        assertEquals("string value", stringError.getRejectedValue());
        assertEquals(123, intError.getRejectedValue());
        assertEquals(true, booleanError.getRejectedValue());
    }

    @Test
    void testCompleteErrorResponseWithValidationErrors() {
        // Given
        String error = "VALIDATION_ERROR";
        String message = "Request validation failed";
        String path = "/api/products";
        int status = 400;
        
        List<ErrorResponse.ValidationError> validationErrors = new ArrayList<>();
        validationErrors.add(new ErrorResponse.ValidationError("title", "Title is required", null));
        validationErrors.add(new ErrorResponse.ValidationError("price", "Price must be positive", "-5"));
        validationErrors.add(new ErrorResponse.ValidationError("description", "Description too long", "Very long description..."));
        
        // When
        ErrorResponse response = new ErrorResponse(error, message, path, status);
        response.setValidationErrors(validationErrors);
        
        // Then
        assertEquals(error, response.getError());
        assertEquals(message, response.getMessage());
        assertEquals(path, response.getPath());
        assertEquals(status, response.getStatus());
        assertNotNull(response.getTimestamp());
        assertEquals(3, response.getValidationErrors().size());
        
        // Verify validation errors
        ErrorResponse.ValidationError titleError = response.getValidationErrors().get(0);
        assertEquals("title", titleError.getField());
        assertEquals("Title is required", titleError.getMessage());
        assertNull(titleError.getRejectedValue());
        
        ErrorResponse.ValidationError priceError = response.getValidationErrors().get(1);
        assertEquals("price", priceError.getField());
        assertEquals("Price must be positive", priceError.getMessage());
        assertEquals("-5", priceError.getRejectedValue());
        
        ErrorResponse.ValidationError descriptionError = response.getValidationErrors().get(2);
        assertEquals("description", descriptionError.getField());
        assertEquals("Description too long", descriptionError.getMessage());
        assertEquals("Very long description...", descriptionError.getRejectedValue());
    }

    @Test
    void testEmptyValidationErrorsList() {
        // Given
        List<ErrorResponse.ValidationError> emptyList = new ArrayList<>();
        
        // When
        errorResponse.setValidationErrors(emptyList);
        
        // Then
        assertNotNull(errorResponse.getValidationErrors());
        assertTrue(errorResponse.getValidationErrors().isEmpty());
        assertEquals(0, errorResponse.getValidationErrors().size());
    }

    @Test
    void testJsonIncludeAnnotation() {
        // Given & When
        boolean hasJsonIncludeAnnotation = ErrorResponse.class.isAnnotationPresent(com.fasterxml.jackson.annotation.JsonInclude.class);
        
        // Then
        assertTrue(hasJsonIncludeAnnotation, "ErrorResponse should have @JsonInclude annotation");
        
        com.fasterxml.jackson.annotation.JsonInclude jsonInclude = ErrorResponse.class.getAnnotation(com.fasterxml.jackson.annotation.JsonInclude.class);
        assertEquals(com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL, jsonInclude.value());
    }

    @Test
    void testTimestampJsonFormatAnnotation() throws NoSuchFieldException {
        // Given & When
        boolean hasJsonFormatAnnotation = ErrorResponse.class.getDeclaredField("timestamp").isAnnotationPresent(com.fasterxml.jackson.annotation.JsonFormat.class);
        
        // Then
        assertTrue(hasJsonFormatAnnotation, "Timestamp field should have @JsonFormat annotation");
        
        com.fasterxml.jackson.annotation.JsonFormat jsonFormat = ErrorResponse.class.getDeclaredField("timestamp").getAnnotation(com.fasterxml.jackson.annotation.JsonFormat.class);
        assertEquals(com.fasterxml.jackson.annotation.JsonFormat.Shape.STRING, jsonFormat.shape());
        assertEquals("yyyy-MM-dd HH:mm:ss", jsonFormat.pattern());
    }

    @Test
    void testBuilderPattern() {
        // Test method chaining simulation
        ErrorResponse response = new ErrorResponse();
        response.setError("TEST_ERROR");
        response.setMessage("Test message");
        response.setPath("/test");
        response.setStatus(400);
        
        // Verify all values are set correctly
        assertEquals("TEST_ERROR", response.getError());
        assertEquals("Test message", response.getMessage());
        assertEquals("/test", response.getPath());
        assertEquals(400, response.getStatus());
        assertNotNull(response.getTimestamp());
    }

    @Test
    void testValidationErrorEquality() {
        // Given
        ErrorResponse.ValidationError error1 = new ErrorResponse.ValidationError("field", "message", "value");
        ErrorResponse.ValidationError error2 = new ErrorResponse.ValidationError("field", "message", "value");
        ErrorResponse.ValidationError error3 = new ErrorResponse.ValidationError("other", "message", "value");
        
        // When & Then
        // Note: Since we don't override equals/hashCode, these will be different instances
        assertNotEquals(error1, error2);
        assertNotEquals(error1, error3);
        
        // But their field values should be equal
        assertEquals(error1.getField(), error2.getField());
        assertEquals(error1.getMessage(), error2.getMessage());
        assertEquals(error1.getRejectedValue(), error2.getRejectedValue());
    }
} 