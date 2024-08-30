// services/api.ts
import axios from 'axios';
import { User, Transaction, AuthTokens } from '../types';

const API_URL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  async register(username: string, email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await axiosInstance.post('/users/register/', { username, email, password });
    return response.data;
  },

  async login(username: string, password: string): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await axiosInstance.post('/users/login/', { username, password });
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await axiosInstance.get('/users/profile/');
    return response.data;
  },

  async getTransactions(): Promise<Transaction[]> {
    const response = await axiosInstance.get('/transactions/');
    return response.data;
  },

  async createTransaction(amount: number, receiverId: number): Promise<Transaction> {
    const response = await axiosInstance.post('/transactions/', { amount, receiver: receiverId });
    return response.data;
  },

  async addToBalance(amount: number): Promise<Transaction> {
    const response = await axiosInstance.put('/balance/add/', { amount });
    return response.data;
  },
};