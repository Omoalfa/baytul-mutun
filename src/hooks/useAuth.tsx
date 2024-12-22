'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, LoginData, RegisterData } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  roles: string[];
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  // resetPassword: (token: string, newPassword: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Function to fetch user profile
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const { data } = await api.getProfile();
      console.log(data, "FETCHING USER");
      setUser(data);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      api.logout(); // Clear invalid token
      setUser(null);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Set up token refresh interval
  // useEffect(() => {
  //   if (!initialLoadDone) return;

  //   const interval = setInterval(() => {
  //     if (authService.getToken()) {
  //       fetchUserProfile();
  //     }
  //   }, 5 * 60 * 1000); // Refresh every 5 minutes

  //   return () => clearInterval(interval);
  // }, [initialLoadDone]);

  const login = async (loginData: LoginData) => {
    try {
      setError(null);
      const { data } = await api.login(loginData);
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login');
      throw err;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setError(null);
      await api.register(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during registration');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push('/login');
  };

  const verifyEmail = async (token: string) => {
    try {
      setError(null);
      console.log(token)
      await api.verifyEmail(token);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during email verification');
      throw err;
    }
  };

  const resendVerification = async (email: string) => {
    try {
      setError(null);
      await api.resendVerification(email);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while resending verification');
      throw err;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setError(null);
      await api.forgotPassword(email);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during password reset request');
      throw err;
    }
  };

  // const resetPassword = async (token: string, newPassword: string) => {
  //   try {
  //     setError(null);
  //     await api.resetPassword(token, newPassword);
  //   } catch (err: any) {
  //     setError(err.response?.data?.message || 'An error occurred during password reset');
  //     throw err;
  //   }
  // };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during Google login');
      throw err;
    }
  };

  const loginWithFacebook = async () => {
    try {
      setError(null);
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`;
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during Facebook login');
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    verifyEmail,
    resendVerification,
    forgotPassword,
    // resetPassword,
    loginWithGoogle,
    loginWithFacebook,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
