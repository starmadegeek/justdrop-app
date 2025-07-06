package com.starmadegeek.justdrop.exception;

public class UnsupportedFileTypeException extends FileStorageException {
    public UnsupportedFileTypeException(String message) {
        super(message);
    }

    public UnsupportedFileTypeException(String message, Throwable cause) {
        super(message, cause);
    }

    public UnsupportedFileTypeException(String template, Object... args) {
        super(formatMessage(template, args));
    }

    public UnsupportedFileTypeException(String template, Throwable cause, Object... args) {
        super(formatMessage(template, args), cause);
    }
}
