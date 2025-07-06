package com.starmadegeek.justdrop.exception;

public class FileNotFoundException extends FileStorageException {
    public FileNotFoundException(String message) {
        super(message);
    }

    public FileNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public FileNotFoundException(String template, Object... args) {
        super(formatMessage(template, args));
    }

    public FileNotFoundException(String template, Throwable cause, Object... args) {
        super(formatMessage(template, args), cause);
    }
}
