import { useQuery } from '@tanstack/react-query';
import { LogEntry } from '../types';
import { API_URL } from '../services/api';

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