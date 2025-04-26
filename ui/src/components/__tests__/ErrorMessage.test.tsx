import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('should not render anything when there are no errors', () => {
    const { container } = render(<ErrorMessage errors={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render a single error message', () => {
    const errors = ['This is an error message'];
    render(<ErrorMessage errors={errors} />);
    
    expect(screen.getByText('This is an error message')).toBeInTheDocument();
  });

  it('should render multiple error messages', () => {
    const errors = ['First error', 'Second error', 'Third error'];
    render(<ErrorMessage errors={errors} />);
    
    expect(screen.getByText(errors[0])).toBeInTheDocument();
    expect(screen.getByText(errors[1])).toBeInTheDocument();
    expect(screen.getByText(errors[2])).toBeInTheDocument();
  });
}); 