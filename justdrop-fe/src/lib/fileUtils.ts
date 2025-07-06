export const SUPPORTED_FILE_TYPES = {
  'text/plain': '.txt',
  'image/jpeg': '.jpg,.jpeg',
  'image/png': '.png',
  'application/json': '.json',
  'text/csv': '.csv',
  'application/pdf': '.pdf',
  'image/gif': '.gif',
  'text/html': '.html',
  'text/css': '.css',
  'application/javascript': '.js',
  'text/xml': '.xml',
} as const;

export const SUPPORTED_EXTENSIONS = Object.values(SUPPORTED_FILE_TYPES).join(',');

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function isFileTypeSupported(file: File): boolean {
  return Object.keys(SUPPORTED_FILE_TYPES).includes(file.type);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getFileIcon(contentType: string): string {
  if (contentType.startsWith('image/')) return '🖼️';
  if (contentType.startsWith('text/')) return '📄';
  if (contentType === 'application/json') return '📋';
  if (contentType === 'application/pdf') return '📕';
  if (contentType === 'text/csv') return '📊';
  return '📁';
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString();
}