import { render, screen,cleanup } from '@testing-library/react';
import Records from '../Records';

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn((key) => {
        if (key === 'sq') return '150'; // Mock squat value
        if (key === 'dl') return '200'; // Mock deadlift value
        if (key === 'bp') return '100'; // Mock bench press value
        // Add more mock values as needed
      }),
    },
    writable: true,
  });
  jest.clearAllMocks();
});
  
afterEach(() => {
  cleanup(); 
});

test('renders Records component with initial records values', () => {
  render(<Records />);
  const deadLiftElement = screen.getByText(/Dead Lift:/);
  expect(deadLiftElement).toBeInTheDocument();
  const squatElement = screen.getByText(/Squat:/);
  expect(squatElement).toBeInTheDocument();
  const benchPressElement = screen.getByText(/Bench Press:/);
  expect(benchPressElement).toBeInTheDocument();
  const totalElement = screen.getByText(/Your total is:/);
  expect(totalElement).toBeInTheDocument();
  const updateRecordsButton = screen.getByText(/Update Records/);
  expect(updateRecordsButton).toBeInTheDocument();
});


