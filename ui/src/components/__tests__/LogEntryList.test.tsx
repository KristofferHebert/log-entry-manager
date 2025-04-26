import { render, screen } from '@testing-library/react';
import { LogEntryList } from '../LogEntryList';
import { LogEntry } from '../../types';

jest.mock('../LogEntryCard', () => ({
  LogEntryCard: ({ log, onEdit, onDelete }: any) => (
    <div data-testid="log-entry-card">
      <div>{log.userName}</div>
      <div>{log.description}</div>
      <div>{log.location}</div>
      <div>{new Date(log.date).toLocaleDateString()}</div>
      <button onClick={() => onEdit(log)}>Edit</button>
      <button onClick={() => onDelete(log.id)}>Delete</button>
    </div>
  )
}));

describe('LogEntryList', () => {
  const mockLogs: LogEntry[] = [
    {
      id: 1,
      userName: 'John Doe',
      description: 'First log entry',
      date: '2023-01-01T00:00:00.000Z',
      location: 'New York',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z'
    },
    {
      id: 2,
      userName: 'Jane Smith',
      description: 'Second log entry',
      date: '2023-01-02T00:00:00.000Z',
      location: 'Los Angeles',
      createdAt: '2023-01-02T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z'
    }
  ];

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  it('should render empty state when no logs are provided', () => {
    render(
      <LogEntryList 
        logs={[]} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('No log entries yet')).toBeInTheDocument();
    expect(screen.getByText('Get started by creating your first log entry.')).toBeInTheDocument();
  });

  it('should render all log entries', () => {
    render(
      <LogEntryList 
        logs={mockLogs} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('First log entry')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Second log entry')).toBeInTheDocument();
  });

  it('should render the correct number of log entries', () => {
    render(
      <LogEntryList 
        logs={mockLogs} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    const logCards = screen.getAllByTestId('log-entry-card');
    expect(logCards).toHaveLength(2);
  });
}); 