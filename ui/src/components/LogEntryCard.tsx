import { LogEntry } from '../types';
import { UserIcon, CalendarIcon, MapPinIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface LogEntryCardProps {
  log: LogEntry;
  onEdit: (log: LogEntry) => void;
  onDelete: (id: number) => void;
}

export function LogEntryCard({ log, onEdit, onDelete }: LogEntryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center text-gray-600">
          <UserIcon className="h-5 w-5 mr-1" />
          <span className="text-sm">{log.userName}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(log)}
            className="p-1 text-gray-500 hover:text-blue-600 transition-colors duration-200"
            aria-label="Edit"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(log.id)}
            className="p-1 text-gray-500 hover:text-red-600 transition-colors duration-200"
            aria-label="Delete"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="text-gray-800 mb-3">{log.description}</p>
      <div className="flex items-center text-sm text-gray-500 space-x-4">
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>{new Date(log.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <MapPinIcon className="h-4 w-4 mr-1" />
          <span>{log.location}</span>
        </div>
      </div>
    </div>
  );
} 