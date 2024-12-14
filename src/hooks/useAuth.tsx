'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import authService, { LoginData, RegisterData } from '@/lib/auth';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  role: string;
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
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = authService.getToken();
    if (token) {
      // TODO: Implement get user profile endpoint and fetch user data
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (data: LoginData) => {
    try {
      setError(null);
      const response = await authService.login(data);
      console.log(response);
      setUser(response.user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during login');
      throw err;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setError(null);
      await authService.register(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during registration');
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const verifyEmail = async (token: string) => {
    try {
      setError(null);
      await authService.verifyEmail(token);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during email verification');
      throw err;
    }
  };

  const resendVerification = async (email: string) => {
    try {
      setError(null);
      await authService.resendVerification(email);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while resending verification');
      throw err;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setError(null);
      await authService.forgotPassword(email);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while requesting password reset');
      throw err;
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      setError(null);
      await authService.resetPassword(token, newPassword);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while resetting password');
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      await authService.loginWithGoogle();
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during Google login');
      throw err;
    }
  };

  const loginWithFacebook = async () => {
    try {
      setError(null);
      await authService.loginWithFacebook();
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
    resetPassword,
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
