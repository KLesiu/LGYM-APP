import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrentTrainingHistorySession from '../CurrentTrainingHistorySession';

const mockGetInformationAboutHistorySession = jest.fn();
const mockOffCurrentTrainingHistorySession = jest.fn();

const mockProps = {
  id: 'session123',
  date: '2023-01-01',
  getInformationAboutHistorySession: mockGetInformationAboutHistorySession,
  offCurrentTrainingHistorySession: mockOffCurrentTrainingHistorySession,
};

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders CurrentTrainingHistorySession component', async () => {
  render(<CurrentTrainingHistorySession {...mockProps} />);
  expect(screen.getByTestId('currentTrainingHistorySession')).toBeInTheDocument();
  expect(mockGetInformationAboutHistorySession).toHaveBeenCalledTimes(1);
});

test('closes CurrentTrainingHistorySession on button click', () => {
  render(<CurrentTrainingHistorySession {...mockProps} />);
  const closeButton = screen.getByText('close');
  fireEvent.click(closeButton);
  expect(mockOffCurrentTrainingHistorySession).toHaveBeenCalledTimes(1);
});

test('shows correct information about the session', async () => {
    const mockResponse = {
      type: 'TrainingDay',
      exercises: [
        { field: 'Exercise1', score: '10kg' },
        { field: 'Exercise2', score: '20kg' },
        // Add more exercises as needed
      ],
    };
    mockGetInformationAboutHistorySession.mockResolvedValueOnce(mockResponse);
  
    render(<CurrentTrainingHistorySession {...mockProps} />);
  
    await waitFor(() => {
      expect(screen.getByText(/TrainingDay:/)).toBeInTheDocument();
      expect(screen.getByText(`Date : ${mockProps.date}`)).toBeInTheDocument();
      
      // Use a regular expression to match '20kg' within the span
      expect(screen.getByText(/20kg/)).toBeInTheDocument();
  
      // Add more assertions for other exercise information
    });
  });

