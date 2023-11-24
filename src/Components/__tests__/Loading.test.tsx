import { render, screen, waitFor,cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Loading from '../Loading';

beforeEach(() => {
  jest.clearAllMocks();
});
afterEach(() => {
  cleanup(); 
});

jest.useFakeTimers();

test('renders Loading component', () => {
  render(<Loading offLoading={() => {}} />);
  const logoElement = screen.getByAltText('logoLoading');
  expect(logoElement).toBeInTheDocument();
});

test('calls offLoading after a delay', async () => {
  const offLoadingMock = jest.fn();
  render(<Loading offLoading={offLoadingMock} />);
  jest.runAllTimers();
  await waitFor(() => expect(offLoadingMock).toHaveBeenCalledTimes(1));
});

test('displays Loading... text', () => {
  render(<Loading offLoading={() => {}} />);
  const loadingText = screen.getByTestId('loadingText');
  expect(loadingText).toBeInTheDocument();
});

test('handles click event', () => {
  const offLoadingMock = jest.fn();
  render(<Loading offLoading={offLoadingMock} />);
  const loadingDiv = screen.getByTestId('loadingDiv');
  userEvent.click(loadingDiv);
  jest.advanceTimersByTime(9000);
  expect(offLoadingMock).toHaveBeenCalled();
});
