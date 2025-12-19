package com.project.back_end.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class ValidationFailed {

    // 1. Global Exception Handler for Validation Failures
    // - This handler will apply globally to all controllers.
    // - Handles MethodArgumentNotValidException which is thrown when @Valid fails.
    // - Aims to return a structured error response for validation failures.

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex) {
        // 2. Extracting field validation errors from the exception
        // - MethodArgumentNotValidException contains a list of all validation errors
        //   for the fields in the request body.
        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
        
        // 3. Collect error messages
        // - For each error, we extract the field name and default error message.
        Map<String, String> errors = new HashMap<>();
        for (FieldError fieldError : fieldErrors) {
            errors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        // 4. Building the response map
        Map<String, Object> response = new HashMap<>();
        response.put("status", "error");
        response.put("message", "Validation failed");
        response.put("errors", errors);

        // 5. Returning ResponseEntity with status 400 (Bad Request)
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
