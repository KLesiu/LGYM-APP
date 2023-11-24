import { render, screen, fireEvent, waitFor,cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTraining from '../AddTraining';

const localStorageMock: Storage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    length: 0, // Add missing properties
    key: jest.fn(),
    removeItem: jest.fn(),
  };  
global.localStorage = localStorageMock;

beforeEach(() => {
  jest.clearAllMocks();
  });
afterEach(() => {
  cleanup(); 
  });

test('renders without crashing', () => {
    render(<AddTraining />);
    expect(screen.getByTestId('withoutPlanTrainingDiv')).toBeInTheDocument();
  },10000);
test('displays a message if the user does not have a plan', () => {
    render(<AddTraining />);
    expect(screen.getByTestId('cantAddTrainingText')).toBeInTheDocument();
  },10000);
test('displays the "Add Training" button and triggers plan selection on click', async () => {
    render(<AddTraining />);
    await waitFor(() => {
      expect(screen.getByTestId('withoutPlanTrainingDiv')).toBeInTheDocument();
    });
    localStorage.setItem('plan', 'completed');
    render(<AddTraining />);
    const addTrainingButton = screen.getByTestId('addTrainingButton');
    expect(addTrainingButton).toBeInTheDocument();
    fireEvent.click(addTrainingButton);
    await waitFor(() => {
      expect(screen.getByText('Choose training day')).toBeInTheDocument();
    });
  },10000);
test('fetches and displays training days on button click', async () => {
    render(<AddTraining />);
    localStorage.setItem('plan', 'completed');
    render(<AddTraining />);
    fireEvent.click(screen.getByTestId('addTrainingButton'));
    await waitFor(() => {
      expect(screen.getByText('Choose training day')).toBeInTheDocument();
    });
    const dayButtons = screen.getAllByRole('button');
    expect(dayButtons.length).toBeGreaterThanOrEqual(1);
  },10000);

