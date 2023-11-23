import React from 'react';
import { render, screen, fireEvent, act,cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateConfigPlan from '../CreateConfigPlan'; 

beforeEach(() => {
  // Reset mock function calls before each test
  jest.clearAllMocks();
});
afterEach(() => {
  cleanup(); 
});

test('renders without crashing', () => {
    render(<CreateConfigPlan setDayAndName={() => {}} />);
    expect(screen.getByText('PLAN CONFIG')).toBeInTheDocument();
    expect(screen.getByTestId('labelName')).toBeInTheDocument();
    expect(screen.getByTestId('labelDays')).toBeInTheDocument();
    expect(screen.getByText('NEXT')).toBeInTheDocument();
  });

test('responds to user input', async () => {
    render(<CreateConfigPlan setDayAndName={() => {}} />);
    
    const nameInput = screen.getByTestId('inputName')
    const daysInput = screen.getByTestId('inputDays')
    
    // Test changing the value of the name input
    await userEvent.type(nameInput, 'Test Plan', { delay: 1 });
    expect(nameInput).toHaveValue('Test Plan');
    
    // Clear the days input
    userEvent.clear(daysInput);
  
    // Test changing the value of the days input
    userEvent.type(daysInput, '3');
    expect(daysInput).toHaveValue(3);
  });



