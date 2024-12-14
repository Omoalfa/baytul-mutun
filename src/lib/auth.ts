import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: any;
  token: string;
}

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;

  private constructor() {
    // Initialize token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    this.setToken(response.data.token);
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await axios.post(`${API_URL}/auth/verify-email?token=${token}`);
    return response.data;
  }

  async resendVerification(email: string): Promise<{ message: string }> {
    const response = await axios.post(`${API_URL}/auth/resend-verification`, { email });
    return response.data;
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return response.data;
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const response = await axios.post(`${API_URL}/auth/reset-password`, {
      token,
      newPassword,
    });
    return response.data;
  }

  async loginWithGoogle(): Promise<void> {
    window.location.href = `${API_URL}/auth/google`;
  }

  async loginWithFacebook(): Promise<void> {
    window.location.href = `${API_URL}/auth/facebook`;
  }

  setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    return this.token;
  }

  logout(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getAuthHeader() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }
}

export const authService = AuthService.getInstance();

export default authService;
