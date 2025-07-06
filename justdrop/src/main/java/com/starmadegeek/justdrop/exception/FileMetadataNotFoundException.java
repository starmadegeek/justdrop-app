package com.starmadegeek.justdrop.exception;

public class FileMetadataNotFoundException extends FileStorageException {
    public FileMetadataNotFoundException(String message) {
        super(message);
    }

    public FileMetadataNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public FileMetadataNotFoundException(String template, Object... args) {
        super(formatMessage(template, args));
    }

    public FileMetadataNotFoundException(String template, Throwable cause, Object... args) {
        super(formatMessage(template, args), cause);
    }
}
