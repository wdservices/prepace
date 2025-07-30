'use client';

import { useEffect, useState } from 'react';

type EnvStatus = {
  env: {
    GOOGLE_API_KEY: string;
    NODE_ENV: string;
  };
  isConfigured: boolean;
  error?: string;
};

export default function DebugPage() {
  const [status, setStatus] = useState<EnvStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEnv() {
      try {
        const response = await fetch('/api/env');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStatus(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchEnv();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Environment Status</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
          <p className="text-red-500 mb-4">{error}</p>
          <p className="text-sm text-gray-600">
            Make sure you're running this in development mode. This endpoint is not available in production.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Environment Status</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Environment Variables</h2>
          <div className="bg-gray-50 p-4 rounded">
            <pre className="text-sm">
              {JSON.stringify(status?.env, null, 2)}
            </pre>
          </div>
        </div>

        <div className="p-4 rounded-md" style={{ 
          backgroundColor: status?.isConfigured ? '#D1FAE5' : '#FEE2E2',
          color: status?.isConfigured ? '#065F46' : '#991B1B',
        }}>
          <p className="font-medium">
            {status?.isConfigured 
              ? '✅ Google API Key is properly configured!' 
              : '❌ Google API Key is missing!'}
          </p>
          {!status?.isConfigured && (
            <div className="mt-2 text-sm">
              <p>To fix this:</p>
              <ol className="list-decimal pl-5 mt-1 space-y-1">
                <li>Create a <code>.env.local</code> file in your project root</li>
                <li>Add: <code>GOOGLE_API_KEY=your_api_key_here</code></li>
                <li>Restart your development server</li>
                <li>For production, set the environment variable in your hosting provider</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
