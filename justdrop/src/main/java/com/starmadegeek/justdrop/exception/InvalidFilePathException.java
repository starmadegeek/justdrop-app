package com.starmadegeek.justdrop.exception;

public class InvalidFilePathException extends FileStorageException {
    public InvalidFilePathException(String message) {
        super(message);
    }

    public InvalidFilePathException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidFilePathException(String template, Object... args) {
        super(formatMessage(template, args));
    }

    public InvalidFilePathException(String template, Throwable cause, Object... args) {
        super(formatMessage(template, args), cause);
    }
}
