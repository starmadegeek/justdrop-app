package com.starmadegeek.justdrop;

public class Constants {
    public static final String DIRECTORY_CREATION_FAILED = "Could not create the directory '{}' where the uploaded files will be stored.";

    public static final String INVALID_FILE_PATH = "Filename contains invalid path sequence: '{}'";

    public static final String UNSUPPORTED_FILE_TYPE = "File type '{}' is not supported. Allowed types: {}";

    public static final String FILE_STORAGE_IO_ERROR = "Could not store file '{}'. Please try again!";

    public static final String FILE_NOT_FOUND = "File '{}' not found in storage";
    public static final String FILE_NOT_FOUND_MALFORMED_URL = "File '{}' not found due to malformed URL";

    public static final String FILE_METADATA_NOT_FOUND = "File metadata not found with id: '{}'";

    private Constants() {

    }
}
