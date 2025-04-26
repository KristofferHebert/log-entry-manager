import { Dialog } from '@headlessui/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { LogEntry, CreateLogEntryDto } from '../types';
import { ErrorMessage } from './ErrorMessage';

interface LogEntryFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateLogEntryDto) => void;
  editLog: LogEntry | null;
  formData: CreateLogEntryDto;
  setFormData: (data: CreateLogEntryDto) => void;
  errors: string[];
}

export function LogEntryForm({
  open,
  onClose,
  onSubmit,
  editLog,
  formData,
  setFormData,
  errors
}: LogEntryFormProps) {
  const handleDateChange = (date: Date) => {
    setFormData({ ...formData, date: date.toISOString() });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded-lg bg-white p-6 w-full shadow-xl">
          <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
            {editLog ? 'Edit Log Entry' : 'New Log Entry'}
          </Dialog.Title>
          
          <ErrorMessage errors={errors} />
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                  errors.length > 0 && !formData.userName.trim() ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                  errors.length > 0 && !formData.description.trim() ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter log description"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={new Date(formData.date)}
                onChange={handleDateChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                  errors.length > 0 && !formData.date ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
                dateFormat="MMMM d, yyyy"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                  errors.length > 0 && !formData.location.trim() ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter location"
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit(formData)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              {editLog ? 'Update' : 'Save'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 