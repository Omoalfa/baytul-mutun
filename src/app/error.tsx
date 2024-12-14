'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative w-48 h-48 mx-auto mb-8">
          <Image
            src="/images/logo.png"
            alt="Error"
            fill
            className="object-contain opacity-50"
          />
        </div>
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Something went wrong!
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We apologize for the inconvenience. Please try again or return to the homepage.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gold hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-gold text-gold text-base font-medium rounded-md hover:bg-gold hover:text-white transition-colors"
          >
            Return Home
          </Link>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-700 font-mono">
              {error.message || error.name}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
