import { useState, useEffect } from 'react';
import { FileMetadata } from '../types';
import { apiClient } from '../lib/api';

interface FilePreviewState {
  content: string | null;
  loading: boolean;
  error: string | null;
}

export function useFilePreview(fileMetadata: FileMetadata | null) {
  const [state, setState] = useState<FilePreviewState>({
    content: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!fileMetadata) {
      setState({ content: null, loading: false, error: null });
      return;
    }

    const loadFileContent = async () => {
      setState({ content: null, loading: true, error: null });
      
      try {
        // Only load text-based files for preview
        if (fileMetadata.contentType.startsWith('text/') || 
            fileMetadata.contentType === 'application/json') {
          const response = await fetch(apiClient.getViewUrl(fileMetadata.id));
          
          if (!response.ok) {
            throw new Error('Failed to load file content');
          }
          
          const content = await response.text();
          setState({ content, loading: false, error: null });
        } else {
          setState({ content: null, loading: false, error: null });
        }
      } catch (error) {
        setState({ 
          content: null, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Failed to load file content' 
        });
      }
    };

    loadFileContent();
  }, [fileMetadata]);

  return state;
}