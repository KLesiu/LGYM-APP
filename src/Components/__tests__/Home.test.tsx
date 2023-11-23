import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../Home';

test('renders Home component', () => {
  render(<Home />);
  const logoElements = screen.getAllByAltText('logo');
  expect(logoElements.length).toBeGreaterThanOrEqual(1);
});