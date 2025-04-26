import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { LogEntry, CreateLogEntryDto } from '../types';

export const API_URL = 'http://localhost:4000/api'; // TODO: Make this configurable

export const useUsername = () => {
  const username = Cookies.get('username') || '';
  
  const setUsername = (newUsername: string) => {
    Cookies.set('username', newUsername);
  };
  
  return { username, setUsername };
};

export const useLogs = () => {
  return useQuery({
    queryKey: ['logs'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/logs`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<LogEntry[]>;
    },
  });
};

export const useCreateLog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (logData: CreateLogEntryDto) => {
      const response = await fetch(`${API_URL}/logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<LogEntry>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
};

export const useUpdateLog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: CreateLogEntryDto }) => {
      const response = await fetch(`${API_URL}/logs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<LogEntry>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
};

export const useDeleteLog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${API_URL}/logs/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
}; 