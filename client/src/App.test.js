import { render, screen } from '@testing-library/react';
import App from './App';

test('renders recipe CTA button', () => {
  render(<App />);
  const ctaButton = screen.getByRole('button', { name: /show me what i can cook/i });
  expect(ctaButton).toBeInTheDocument();
});
