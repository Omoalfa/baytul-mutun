'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { verifyEmail, resendVerification, error } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      handleVerification(token);
    }
  }, [searchParams]);

  const handleVerification = async (token: string) => {
    try {
      setLoading(true);
      await verifyEmail(token);
      setMessage('Email verified successfully! You can now log in.');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err) {
      // Error handled by auth context
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      await resendVerification(email);
      setMessage('Verification email has been resent. Please check your inbox.');
    } catch (err) {
      // Error handled by auth context
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
        </div>

        {message && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="text-sm text-green-700">{message}</div>
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <div className="mt-8">
          <p className="text-center text-gray-600 mb-8">
            Didn't receive the verification email? Enter your email address below to
            resend it.
          </p>

          <form onSubmit={handleResend} className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                Resend Verification Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
