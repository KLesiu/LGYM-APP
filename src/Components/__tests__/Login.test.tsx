import { render, screen,cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../Login';

beforeEach(() => {
  jest.clearAllMocks();
});
afterEach(() => {
  cleanup(); 
});

test('renders Login component', () => {
  render(<Login />);
  const loginForm = screen.getByTestId('login');
  expect(loginForm).toBeInTheDocument();
  const logoElement = screen.getByAltText('logo');
  expect(logoElement).toBeInTheDocument();
  const usernameLabel = screen.getByLabelText('Username');
  expect(usernameLabel).toBeInTheDocument();
  const usernameInput = screen.getByLabelText('Username');
  expect(usernameInput).toBeInTheDocument();
  const passwordLabel = screen.getByLabelText('Password');
  expect(passwordLabel).toBeInTheDocument();
  const passwordInput = screen.getByLabelText('Password');
  expect(passwordInput).toBeInTheDocument();
  const loginButton = screen.getByText('LOGIN');
  expect(loginButton).toBeInTheDocument();
  const registerLink = screen.getByText('You dont have acc? Lets create it for FREE');
  expect(registerLink).toBeInTheDocument();
});

  
  
  