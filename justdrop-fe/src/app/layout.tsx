import './globals.css';
import { FileStorageProvider } from '../context/FileStorageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <FileStorageProvider>
          <div className="min-h-screen">
            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                  <div className="flex items-center">
                    <h1 className="text-3xl font-bold text-gray-900">JustDrop</h1>
                    <span className="ml-2 text-sm text-gray-500">Simple File Storage</span>
                  </div>
                </div>
              </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                {children}
              </div>
            </main>
          </div>
        </FileStorageProvider>
      </body>
    </html>
  );
}