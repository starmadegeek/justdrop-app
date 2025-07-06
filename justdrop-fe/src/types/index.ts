
export interface FileMetadata {
  id: number;
  filename: string;
  originalFilename: string;
  contentType: string;
  size: number;
  uploadDate: string;
}

export interface UploadResponse {
  id: number;
  filename: string;
  originalFilename: string;
  contentType: string;
  size: number;
  uploadDate: string;
}

export interface ApiError {
  message: string;
  status: number;
}