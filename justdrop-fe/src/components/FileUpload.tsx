'use client';

import React, { useCallback, useState } from 'react';
import { useFileStorage } from '../context/FileStorageContext';
import { isFileTypeSupported, MAX_FILE_SIZE, formatFileSize, SUPPORTED_EXTENSIONS } from '../lib/fileUtils';

export function FileUpload() {
  const { state, uploadFile } = useFileStorage();
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    if (!isFileTypeSupported(file)) {
      alert('File type not supported. Please upload: txt, jpg, png, json, csv, pdf, gif, html, css, js, xml files.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert(`File size exceeds ${formatFileSize(MAX_FILE_SIZE)} limit.`);
      return;
    }

    await uploadFile(file);
  }, [uploadFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  }, [handleFileSelect]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mb-4">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Drop your file here</p>
          <p className="text-sm text-gray-500 mt-1">or click to browse</p>
        </div>
        <input
          type="file"
          accept={SUPPORTED_EXTENSIONS}
          onChange={handleFileInputChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Choose File
        </label>
        <p className="text-xs text-gray-500 mt-3">
          Supported: txt, jpg, png, json, csv, pdf, gif, html, css, js, xml
        </p>
        <p className="text-xs text-gray-500">
          Max size: {formatFileSize(MAX_FILE_SIZE)}
        </p>
      </div>

      {state.uploadProgress !== null && (
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${state.uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">Uploading... {state.uploadProgress}%</p>
        </div>
      )}
    </div>
  );
}