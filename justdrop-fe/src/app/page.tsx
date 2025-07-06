'use client';

import React, { useEffect, useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { FileList } from '../components/FileList';
import { ErrorMessage } from '../components/ErrorMessage';
import { useFileStorage } from '../context/FileStorageContext';

export default function HomePage() {
  const { state, fetchFiles, clearError } = useFileStorage();
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return (
    <div className="space-y-6">
      {state.error && (
        <ErrorMessage message={state.error} onClose={clearError} />
      )}

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Your Files ({state.files.length})
            </h2>
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {showUpload ? 'Hide Upload' : 'Upload File'}
            </button>
          </div>

          {showUpload && (
            <div className="mb-6">
              <FileUpload />
            </div>
          )}

          <FileList files={state.files} loading={state.loading} />
        </div>
      </div>
    </div>
  );
}