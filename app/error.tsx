"use client";

import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
                    <p className="text-gray-600 text-sm mb-2">Error: {error.message}</p>
                    {error.digest && (
                        <p className="text-gray-400 text-xs">Digest: {error.digest}</p>
                    )}
                </div>
                
                <div className="space-y-3">
                    <button 
                        onClick={() => reset()}
                        className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        Try again
                    </button>
                    <Link 
                        href="/tasks"
                        className="block w-full px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                        Back to tasks
                    </Link>
                </div>
            </div>
        </div>
    );
}