// src/services/auth.service.ts
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

// Define the base API URL
const API_URL = 'http://localhost:8081';

// User interface
export interface User {
  email: string;
  name?: string;
  picture?: string;
}

// Authentication response interface
interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();
  
  // Create API instance with interceptors
  private api = axios.create({
    baseURL: API_URL,
  });
  
  constructor() {
    // Initialize Google Auth
    GoogleAuth.initialize();
    
    // Setup request interceptor
    this.api.interceptors.request.use(
      config => {
        const token = this.getAccessToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );
    
    // Setup response interceptor for token refresh
    this.api.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = this.getRefreshToken();
            if (!refreshToken) {
              throw new Error('No refresh token available');
            }
            
            const response = await axios.post<AuthResponse>(
              `${API_URL}/api/auth/refresh`,
              { refreshToken }
            );
            
            this.storeTokens(response.data);
            
            // Update the authorization header
            originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
            
            // Retry the original request
            return this.api(originalRequest);
          } catch (refreshError) {
            // If refresh token fails, logout
            this.logout();
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
    
    // Check if user is already logged in
    this.loadUserFromStorage();
  }
  
  /**
   * Load user from storage if available
   */
  private loadUserFromStorage(): void {
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    const userPicture = localStorage.getItem('userPicture');
    
    if (userEmail) {
      this.currentUserSubject.next({
        email: userEmail,
        name: userName || undefined,
        picture: userPicture || undefined
      });
    }
  }
  
  /**
   * Login with Google
   */
  async loginWithGoogle(): Promise<User> {
    try {
      // Sign in with Google and get user data including ID token
      const googleUser = await GoogleAuth.signIn();
      const idToken = googleUser.authentication.idToken;
      
      // Send the ID token to your Spring Boot backend
      const response = await axios.post<AuthResponse>(
        `${API_URL}/api/auth/google`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        }
      );
      
      // Store tokens
      this.storeTokens(response.data);
      
      // Store user info
      localStorage.setItem('userEmail', googleUser.email);
      if (googleUser.name) localStorage.setItem('userName', googleUser.name);
      if (googleUser.imageUrl) localStorage.setItem('userPicture', googleUser.imageUrl);
      
      // Update current user
      const user: User = {
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.imageUrl
      };
      
      this.currentUserSubject.next(user);
      return user;
    } catch (error) {
      console.error('Google login failed', error);
      throw error;
    }
  }
  
  /**
   * Store authentication tokens
   */
  private storeTokens(authResponse: AuthResponse): void {
    localStorage.setItem('accessToken', authResponse.accessToken);
    localStorage.setItem('refreshToken', authResponse.refreshToken);
    localStorage.setItem('tokenExpiry', new Date(Date.now() + authResponse.expiresIn * 1000).toString());
  }
  
  /**
   * Get the stored access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }
  
  /**
   * Get the stored refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
  
  /**
   * Check if the user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    const expiry = localStorage.getItem('tokenExpiry');
    
    if (!token || !expiry) {
      return false;
    }
    
    // Check if token is expired
    return new Date(expiry) > new Date();
  }
  
  /**
   * Verify authentication with backend
   */
  async verifyAuth(): Promise<boolean> {
    if (!this.isAuthenticated()) {
      return false;
    }
    
    try {
      const response = await this.api.get<User>('/api/auth/verify');
      
      // Update user info with latest from server
      const user = response.data;
      this.currentUserSubject.next(user);
      
      // Update stored user info
      localStorage.setItem('userEmail', user.email);
      if (user.name) localStorage.setItem('userName', user.name);
      if (user.picture) localStorage.setItem('userPicture', user.picture);
      
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }
  
  /**
   * Logout user
   */
  logout(): void {
    // Clear all stored tokens and user info
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userPicture');
    
    // Clear current user
    this.currentUserSubject.next(null);
    
    // Logout from Google
    GoogleAuth.signOut();
  }
  
  /**
   * Get API instance with authentication
   */
  getApi() {
    return this.api;
  }
}

// Create a singleton instance
export const authService = new AuthService();
export default authService;