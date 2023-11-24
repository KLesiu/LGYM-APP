import { render, screen, waitFor } from '@testing-library/react';
import LoadingSection from '../LoadingSection';

test('renders LoadingSection component', () => {
  render(<LoadingSection />);
  const loadingSection = screen.getByTestId('loadingSection');
  expect(loadingSection).toBeInTheDocument();
  const backgroundLGYM = screen.getByAltText('backgroundLGYM');
  expect(backgroundLGYM).toBeInTheDocument();
  const fakeSection = screen.getByTestId('fakeSection');
  expect(fakeSection).toBeInTheDocument();
  const iconElement = screen.getByTestId('loadingIcon');
  expect(iconElement).toBeInTheDocument();
  expect(iconElement).toHaveClass('animationRotate');
  const loadingText = screen.getByText('Loading...');
  expect(loadingText).toBeInTheDocument();
});

test('applies animation class to the icon', async () => {
  render(<LoadingSection />);
  const iconElement = screen.getByTestId('loadingIcon');
  await waitFor(() => {
    expect(iconElement).toHaveClass('animationRotate');
  }, { timeout: 2000 }); 
});