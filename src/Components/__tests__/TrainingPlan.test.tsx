import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TrainingPlan from '../TrainingPlan';

test('renders TrainingPlan component with no plans', () => {
  render(<TrainingPlan />);

  const withoutPlanContainer = screen.getByText(/You dont have any plans!/i);
  expect(withoutPlanContainer).toBeInTheDocument();

  const createPlanButton = screen.getByText(/Create your plan now!/i);
  expect(createPlanButton).toBeInTheDocument();
});

