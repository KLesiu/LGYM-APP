import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from '../Profile';

beforeEach(() => {
  // Mock localStorage values
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn((key) => {
        if (key === 'username') return 'TestUser';
        if (key === 'email') return 'test@example.com';
        if (key === 'id') return '123';
        // Add more mock values as needed
      }),
      removeItem: jest.fn(),
    },
    writable: true,
  });
});

test('renders Profile component with user information', () => {
  render(<Profile />);

  const nameElement = screen.getByText('Name: TestUser');
  expect(nameElement).toBeInTheDocument();

  const rankElement = screen.getByText('Profile Rank :');
  expect(rankElement).toBeInTheDocument();

  const emailElement = screen.getByText('Email: test@example.com');
  expect(emailElement).toBeInTheDocument();

  const memberSinceElement = screen.getByText('Member Since:');
  expect(memberSinceElement).toBeInTheDocument();
});

test('logs out user when logout button is clicked', async () => {
  render(<Profile />);

  const logoutButton = screen.getByText('Logout');
  fireEvent.click(logoutButton);

  await waitFor(() => {
    expect(window.localStorage.removeItem).toHaveBeenCalledTimes(9); 
    expect(window.location.href).toBe("http://localhost/");
  });
});