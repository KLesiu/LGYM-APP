import { render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import History from '../History';

test('displays "You dont have training history!" when there is no training history', async () => {
    render(<History />);
    await waitFor(() => {
    expect(screen.getByText('You dont have training history!')).toBeInTheDocument();
    });
  });
