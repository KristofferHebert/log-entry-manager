import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
  errors: string[];
}

export function ErrorMessage({ errors }: ErrorMessageProps) {
  if (errors.length === 0) return null;

  return (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md" data-testid="error-container">
      <div className="flex items-start">
        <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <ul className="list-disc list-inside space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-sm text-red-700">{error}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 