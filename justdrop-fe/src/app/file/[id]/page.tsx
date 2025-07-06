'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { FileMetadata } from '../../../types';
import { apiClient } from '../../../lib/api';
import { useFilePreview } from '../../../hooks/useFilePreview';
import { formatFileSize, formatDate, getFileIcon } from '../../../lib/fileUtils';

export default function FileViewPage() {
  const router = useRouter();
  const params = useParams();
  const [fileMetadata, setFileMetadata] = useState<FileMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  
  const { content, loading: previewLoading, error: previewError } = useFilePreview(fileMetadata);

  useEffect(() => {
    const loadFileMetadata = async () => {
      try {
        setLoading(true);
        const id = parseInt(params.id as string);
        const metadata = await apiClient.getFileMetadata(id);
        setFileMetadata(metadata);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load file');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadFileMetadata();
    }
  }, [params.id]);

  // Load image dimensions for Next.js Image component
  useEffect(() => {
    if (fileMetadata && fileMetadata.contentType.startsWith('image/')) {
      const img = new window.Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
      };
      img.src = apiClient.getViewUrl(fileMetadata.id);
    }
  }, [fileMetadata]);

  const handleDownload = () => {
    if (!fileMetadata) return;
    
    const link = document.createElement('a');
    link.href = apiClient.getDownloadUrl(fileMetadata.id);
    link.download = fileMetadata.originalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const canPreview = fileMetadata && (
    fileMetadata.contentType.startsWith('text/') || 
    fileMetadata.contentType === 'application/json'
  );

  const canViewInline = fileMetadata && fileMetadata.contentType.startsWith('image/');

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !fileMetadata) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'File not found'}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
        >
          ← Back to Files
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => router.push('/')}
              className="mr-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m7 7l7-7m-7 7V3" />
              </svg>
            </button>
            <div className="flex items-center">
              <span className="text-3xl mr-3">{getFileIcon(fileMetadata.contentType)}</span>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {fileMetadata.originalFilename}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {formatFileSize(fileMetadata.size)} • {formatDate(fileMetadata.uploadDate)}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
        </div>
      </div>

      {/* File Preview Section */}
      {canViewInline && imageDimensions.width > 0 && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Preview</h4>
            <div className="flex justify-center">
              <div className="relative max-w-full max-h-96 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={apiClient.getViewUrl(fileMetadata.id)}
                  alt={fileMetadata.originalFilename}
                  width={imageDimensions.width}
                  height={imageDimensions.height}
                  className="object-contain"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '384px', // max-h-96 in pixels
                    width: 'auto',
                    height: 'auto'
                  }}
                  unoptimized={true} // Since this is from an external API
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {canPreview && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Content</h4>
            {previewLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            ) : previewError ? (
              <p className="text-red-600">{previewError}</p>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap overflow-auto max-h-96">
                  {content}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* File Details */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">File Details</h4>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Original Filename</dt>
              <dd className="mt-1 text-sm text-gray-900">{fileMetadata.originalFilename}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">File Size</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatFileSize(fileMetadata.size)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Content Type</dt>
              <dd className="mt-1 text-sm text-gray-900">{fileMetadata.contentType}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Upload Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatDate(fileMetadata.uploadDate)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}