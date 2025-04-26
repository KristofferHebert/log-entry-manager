import { LogEntry } from '../types';
import { LogEntryCard } from './LogEntryCard';

interface LogEntryListProps {
  logs: LogEntry[];
  onEdit: (log: LogEntry) => void;
  onDelete: (id: number) => void;
}

export function LogEntryList({ logs, onEdit, onDelete }: LogEntryListProps) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No log entries yet</h3>
        <p className="text-gray-500 mb-4">Get started by creating your first log entry.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-1">
      {logs.map(log => (
        <LogEntryCard
          key={log.id}
          log={log}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
} 