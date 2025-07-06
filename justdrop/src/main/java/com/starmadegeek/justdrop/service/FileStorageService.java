package com.starmadegeek.justdrop.service;


import com.starmadegeek.justdrop.Constants;
import com.starmadegeek.justdrop.exception.*;
import com.starmadegeek.justdrop.model.FileMetadata;
import com.starmadegeek.justdrop.repository.FileMetadataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.UUID;


@Service
public class FileStorageService {

    private final Path fileStorageLocation;
    private final FileMetadataRepository fileMetadataRepository;

    @Autowired
    public FileStorageService(@Value("${file.upload-dir}") String uploadDir,
                              FileMetadataRepository fileMetadataRepository) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        this.fileMetadataRepository = fileMetadataRepository;

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new DirectoryCreationException(Constants.DIRECTORY_CREATION_FAILED, ex, uploadDir);
        }
    }

    public FileMetadata storeFile(MultipartFile file) {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        try {
            if (fileName.contains("..")) {
                throw new InvalidFilePathException(Constants.INVALID_FILE_PATH, fileName);
            }

            String uniqueFileName = UUID.randomUUID() + "_" + fileName;
            Path targetLocation = this.fileStorageLocation.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            FileMetadata fileMetadata = new FileMetadata(
                    uniqueFileName,
                    fileName,
                    file.getContentType(),
                    file.getSize(),
                    targetLocation.toString(),
                    LocalDateTime.now()
            );

            return fileMetadataRepository.save(fileMetadata);

        } catch (IOException ex) {
            throw new FileStorageIOException(Constants.FILE_STORAGE_IO_ERROR, ex, fileName);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new FileNotFoundException(Constants.FILE_NOT_FOUND, fileName);
            }
        } catch (MalformedURLException ex) {
            throw new FileNotFoundException(Constants.FILE_NOT_FOUND_MALFORMED_URL, ex, fileName);
        }
    }

    public List<FileMetadata> getAllFiles() {
        return fileMetadataRepository.findAll();
    }

    public FileMetadata getFileMetadata(Long id) {
        return fileMetadataRepository.findById(id)
                .orElseThrow(() -> new FileMetadataNotFoundException(Constants.FILE_METADATA_NOT_FOUND, id));
    }
}
