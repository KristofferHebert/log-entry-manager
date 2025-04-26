export interface LogEntry {
  id: number;
  userName: string;
  description: string;
  date: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateLogEntryDto = Omit<LogEntry, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateLogEntryDto = CreateLogEntryDto; 