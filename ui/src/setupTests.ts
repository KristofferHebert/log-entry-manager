import '@testing-library/jest-dom/extend-expect';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveClass(className: string): R;
      toBeInTheDocument(): R;
    }
  }
} 