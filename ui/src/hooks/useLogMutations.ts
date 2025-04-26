import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LogEntry, CreateLogEntryDto } from '../types';
import { API_URL } from '../services/api';

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