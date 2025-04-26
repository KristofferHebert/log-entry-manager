import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

jest.mock('../hooks', () => ({
  useLogs: () => ({
    data: [{   
      id: 1,
      userName: 'John Doe',
      description: 'Test log entry',
      date: '2023-01-01T00:00:00.000Z',
      location: 'New York'
    }],
    isLoading: false,
    error: null,
    isError: false
  }),
  useCreateLog: () => ({
    mutate: jest.fn(),
    mutateAsync: jest.fn(),
    isLoading: false,
    error: null,
    isError: false
  }),
  useUpdateLog: () => ({
    mutate: jest.fn(),
    mutateAsync: jest.fn(),
    isLoading: false,
    error: null,
    isError: false
  }),
  useDeleteLog: () => ({
    mutate: jest.fn(),
    mutateAsync: jest.fn(),
    isLoading: false,
    error: null,
    isError: false
  }),
  useUsername: () => ({
    username: '',
    setUsername: jest.fn()
  })
}));

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('App Component', () => {
  it('renders the app title', () => {
    renderWithQueryClient(<App />);
    const titleElement = screen.getByText('Log Entry Manager');
    expect(titleElement).toBeInTheDocument();
  });
}); 