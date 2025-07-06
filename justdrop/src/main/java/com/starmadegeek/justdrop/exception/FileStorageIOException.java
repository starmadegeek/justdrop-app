package com.starmadegeek.justdrop.exception;

public class FileStorageIOException extends FileStorageException {
    public FileStorageIOException(String message) {
        super(message);
    }

    public FileStorageIOException(String message, Throwable cause) {
        super(message, cause);
    }

    public FileStorageIOException(String template, Object... args) {
        super(formatMessage(template, args));
    }

    public FileStorageIOException(String template, Throwable cause, Object... args) {
        super(formatMessage(template, args), cause);
    }
}
