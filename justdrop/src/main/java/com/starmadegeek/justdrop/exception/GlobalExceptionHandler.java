package com.starmadegeek.justdrop.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(DirectoryCreationException.class)
    public ResponseEntity<Map<String, Object>> handleDirectoryCreationException(DirectoryCreationException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, "DIRECTORY_CREATION_ERROR");
    }

    @ExceptionHandler(InvalidFilePathException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidFilePathException(InvalidFilePathException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST, "INVALID_FILE_PATH");
    }

    @ExceptionHandler(UnsupportedFileTypeException.class)
    public ResponseEntity<Map<String, Object>> handleUnsupportedFileTypeException(UnsupportedFileTypeException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST, "UNSUPPORTED_FILE_TYPE");
    }

    @ExceptionHandler(FileStorageIOException.class)
    public ResponseEntity<Map<String, Object>> handleFileStorageIOException(FileStorageIOException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, "FILE_STORAGE_IO_ERROR");
    }

    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleFileNotFoundException(FileNotFoundException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND, "FILE_NOT_FOUND");
    }

    @ExceptionHandler(FileMetadataNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleFileMetadataNotFoundException(FileMetadataNotFoundException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND, "FILE_METADATA_NOT_FOUND");
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Map<String, Object>> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException ex) {
        return buildErrorResponse("File size exceeds the maximum allowed limit", HttpStatus.BAD_REQUEST, "FILE_SIZE_EXCEEDED");
    }

    @ExceptionHandler(FileStorageException.class)
    public ResponseEntity<Map<String, Object>> handleFileStorageException(FileStorageException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, "FILE_STORAGE_ERROR");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {
        return buildErrorResponse("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR");
    }

    private ResponseEntity<Map<String, Object>> buildErrorResponse(String message, HttpStatus status, String errorCode) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", status.value());
        errorResponse.put("error", status.getReasonPhrase());
        errorResponse.put("message", message);
        errorResponse.put("errorCode", errorCode);

        return new ResponseEntity<>(errorResponse, status);
    }
}
