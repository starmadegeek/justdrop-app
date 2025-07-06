'use client';

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { FileMetadata, UploadResponse } from '../types';
import { apiClient } from '../lib/api';

interface FileStorageState {
  files: FileMetadata[];
  loading: boolean;
  error: string | null;
  uploadProgress: number | null;
}

type FileStorageAction =
  | { type: 'FETCH_FILES_START' }
  | { type: 'FETCH_FILES_SUCCESS'; payload: FileMetadata[] }
  | { type: 'FETCH_FILES_ERROR'; payload: string }
  | { type: 'UPLOAD_START' }
  | { type: 'UPLOAD_PROGRESS'; payload: number }
  | { type: 'UPLOAD_SUCCESS'; payload: UploadResponse }
  | { type: 'UPLOAD_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

const initialState: FileStorageState = {
  files: [],
  loading: false,
  error: null,
  uploadProgress: null,
};

function fileStorageReducer(state: FileStorageState, action: FileStorageAction): FileStorageState {
  switch (action.type) {
    case 'FETCH_FILES_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_FILES_SUCCESS':
      return { ...state, loading: false, files: action.payload };
    case 'FETCH_FILES_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'UPLOAD_START':
      return { ...state, uploadProgress: 0, error: null };
    case 'UPLOAD_PROGRESS':
      return { ...state, uploadProgress: action.payload };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        uploadProgress: null,
        files: [action.payload, ...state.files],
      };
    case 'UPLOAD_ERROR':
      return { ...state, uploadProgress: null, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

interface FileStorageContextType {
  state: FileStorageState;
  fetchFiles: () => Promise<void>;
  uploadFile: (file: File) => Promise<void>;
  clearError: () => void;
}

const FileStorageContext = createContext<FileStorageContextType | undefined>(undefined);

export function FileStorageProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(fileStorageReducer, initialState);

  const fetchFiles = useCallback(async () => {
    dispatch({ type: 'FETCH_FILES_START' });
    try {
      const files = await apiClient.getAllFiles();
      dispatch({ type: 'FETCH_FILES_SUCCESS', payload: files });
    } catch (error) {
      dispatch({ type: 'FETCH_FILES_ERROR', payload: error instanceof Error ? error.message : 'Failed to fetch files' });
    }
  }, []);

  const uploadFile = useCallback(async (file: File) => {
    dispatch({ type: 'UPLOAD_START' });
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        dispatch({ type: 'UPLOAD_PROGRESS', payload: Math.min(90, (state.uploadProgress || 0) + 10) });
      }, 200);

      const response = await apiClient.uploadFile(file);
      
      clearInterval(progressInterval);
      dispatch({ type: 'UPLOAD_PROGRESS', payload: 100 });
      
      setTimeout(() => {
        dispatch({ type: 'UPLOAD_SUCCESS', payload: response });
      }, 500);
    } catch (error) {
      dispatch({ type: 'UPLOAD_ERROR', payload: error instanceof Error ? error.message : 'Upload failed' });
    }
  }, [state.uploadProgress]);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  return (
    <FileStorageContext.Provider value={{ state, fetchFiles, uploadFile, clearError }}>
      {children}
    </FileStorageContext.Provider>
  );
}

export function useFileStorage() {
  const context = useContext(FileStorageContext);
  if (!context) {
    throw new Error('useFileStorage must be used within a FileStorageProvider');
  }
  return context;
}