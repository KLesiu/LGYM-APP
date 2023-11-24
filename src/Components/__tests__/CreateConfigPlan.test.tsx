import { render, screen,cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateConfigPlan from '../CreateConfigPlan'; 

beforeEach(() => {
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
    await userEvent.type(nameInput, 'Test Plan', { delay: 1 });
    expect(nameInput).toHaveValue('Test Plan');
    userEvent.clear(daysInput);
    userEvent.type(daysInput, '3');
    expect(daysInput).toHaveValue(3);
  });



