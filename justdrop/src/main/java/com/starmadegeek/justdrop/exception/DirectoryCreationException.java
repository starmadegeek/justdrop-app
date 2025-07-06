package com.starmadegeek.justdrop.exception;

public class DirectoryCreationException extends FileStorageException {
    public DirectoryCreationException(String message) {
        super(message);
    }

    public DirectoryCreationException(String message, Throwable cause) {
        super(message, cause);
    }

    public DirectoryCreationException(String template, Object... args) {
        super(formatMessage(template, args));
    }

    public DirectoryCreationException(String template, Throwable cause, Object... args) {
        super(formatMessage(template, args), cause);
    }
}
