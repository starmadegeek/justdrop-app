package com.starmadegeek.justdrop.controller;

import com.starmadegeek.justdrop.model.FileMetadata;
import com.starmadegeek.justdrop.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<FileMetadata> uploadFile(@RequestParam("file") MultipartFile file) {
        FileMetadata fileMetadata = fileStorageService.storeFile(file);
        return ResponseEntity.ok(fileMetadata);
    }

    @GetMapping
    public ResponseEntity<List<FileMetadata>> getAllFiles() {
        List<FileMetadata> files = fileStorageService.getAllFiles();
        return ResponseEntity.ok(files);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FileMetadata> getFileMetadata(@PathVariable Long id) {
        FileMetadata fileMetadata = fileStorageService.getFileMetadata(id);
        return ResponseEntity.ok(fileMetadata);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) {
        FileMetadata fileMetadata = fileStorageService.getFileMetadata(id);
        Resource resource = fileStorageService.loadFileAsResource(fileMetadata.getFilename());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(fileMetadata.getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + fileMetadata.getOriginalFilename() + "\"")
                .body(resource);
    }

    @GetMapping("/view/{id}")
    public ResponseEntity<Resource> viewFile(@PathVariable Long id) {
        FileMetadata fileMetadata = fileStorageService.getFileMetadata(id);
        Resource resource = fileStorageService.loadFileAsResource(fileMetadata.getFilename());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(fileMetadata.getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + fileMetadata.getOriginalFilename() + "\"")
                .body(resource);
    }
}