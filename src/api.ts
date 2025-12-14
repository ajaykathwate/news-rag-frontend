import axios from 'axios';
import type { Message, ChatResponse } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendMessage = async (sessionId: string, message: string): Promise<ChatResponse> => {
  const response = await api.post('/chat', { sessionId, message });
  return response.data;
};

export const getHistory = async (sessionId: string): Promise<{ history: Message[] }> => {
  const response = await api.get(`/chat/${sessionId}/history`);
  return response.data;
};

export const clearSession = async (sessionId: string): Promise<void> => {
  await api.delete(`/chat/${sessionId}`);
};
