import { render, screen,cleanup  } from '@testing-library/react';
import TrainingPlan from '../TrainingPlan';

beforeEach(() => {
  jest.clearAllMocks();
  });
afterEach(() => {
  cleanup(); 
  });

test('renders TrainingPlan component with no plans', () => {
  render(<TrainingPlan />);
  const withoutPlanContainer = screen.getByText(/You dont have any plans!/i);
  expect(withoutPlanContainer).toBeInTheDocument();
  const createPlanButton = screen.getByText(/Create your plan now!/i);
  expect(createPlanButton).toBeInTheDocument();
});

