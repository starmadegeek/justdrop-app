import { FileMetadata, UploadResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async uploadFile(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseUrl}/api/files/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getAllFiles(): Promise<FileMetadata[]> {
    const response = await fetch(`${this.baseUrl}/api/files`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch files: ${response.statusText}`);
    }

    return response.json();
  }

  async getFileMetadata(id: number): Promise<FileMetadata> {
    const response = await fetch(`${this.baseUrl}/api/files/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch file metadata: ${response.statusText}`);
    }

    return response.json();
  }

  getDownloadUrl(id: number): string {
    return `${this.baseUrl}/api/files/download/${id}`;
  }

  getViewUrl(id: number): string {
    return `${this.baseUrl}/api/files/view/${id}`;
  }
}

export const apiClient = new ApiClient();