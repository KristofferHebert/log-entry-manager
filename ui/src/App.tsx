import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLogs, useCreateLog, useUpdateLog, useDeleteLog, useUsername } from './hooks';
import { LogEntry, CreateLogEntryDto } from './types';
import { PlusIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import { LogEntryList } from './components/LogEntryList';
import { LogEntryForm } from './components/LogEntryForm';

const queryClient = new QueryClient();

function AppContent() {
  const { data: logs, isLoading } = useLogs();
  const createLog = useCreateLog();
  const updateLog = useUpdateLog();
  const deleteLog = useDeleteLog();
  const { username } = useUsername();
  
  const [open, setOpen] = useState(false);
  const [editLog, setEditLog] = useState<LogEntry | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<CreateLogEntryDto>({
    userName: username,
    description: '',
    date: new Date().toISOString(),
    location: ''
  });

  useEffect(() => {
    if (username) {
      setFormData(prev => ({ ...prev, userName: username }));
    }
  }, [username]);

  const handleOpen = (log?: LogEntry) => {
    setErrors([]);
    if (log) {
      setEditLog(log);
      setFormData({
        userName: log.userName,
        description: log.description,
        date: log.date,
        location: log.location
      });
    } else {
      setEditLog(null);
      setFormData({
        userName: username,
        description: '',
        date: new Date().toISOString(),
        location: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditLog(null);
    setErrors([]);
  };

  const handleSubmit = async (data: CreateLogEntryDto) => {
    try {
      const newErrors: string[] = [];
      
      if (!data.userName.trim()) {
        newErrors.push('User name is required');
      }
      if (!data.description.trim()) {
        newErrors.push('Description is required');
      }
      if (!data.location.trim()) {
        newErrors.push('Location is required');
      }
      
      if (newErrors.length > 0) {
        setErrors(newErrors);
        return;
      }
      
      Cookies.set('username', data.userName);
      
      if (editLog) {
        await updateLog.mutateAsync({ id: editLog.id, data });
      } else {
        await createLog.mutateAsync(data);
      }
      handleClose();
    } catch (error) {
      console.error('Failed to save log:', error);
      setErrors(['Failed to save log entry. Please try again.']);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this log entry?')) {
      try {
        await deleteLog.mutateAsync(id);
      } catch (error) {
        console.error('Failed to delete log:', error);
        setErrors(['Failed to delete log entry. Please try again.']);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Log Entry Manager</h1>
          <button
            onClick={() => handleOpen()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Log
          </button>
        </div>

        <LogEntryList
          logs={logs || []}
          onEdit={handleOpen}
          onDelete={handleDelete}
        />

        <LogEntryForm
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
          editLog={editLog}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
} 