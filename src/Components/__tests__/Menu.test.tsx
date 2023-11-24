import { render, fireEvent, screen,cleanup } from '@testing-library/react';
import Menu from '../Menu';

beforeEach(() => {
  jest.clearAllMocks();
});
afterEach(() => {
  cleanup(); 
});

test('renders Menu component', () => {
  render(<Menu viewChange={()=>{}} />);
  const menuNav = screen.getByRole('navigation');
  expect(menuNav).toBeInTheDocument();
  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(5);
});
test('changes view when clicking on "note" button', () => {
  const viewChangeMock = jest.fn();
  render(<Menu viewChange={viewChangeMock} />);
  const noteButton = screen.getByText('note');
  fireEvent.click(noteButton);
  expect(viewChangeMock).toHaveBeenCalledWith(expect.any(Object));
});
test('changes view when clicking on "calendar_month" button', () => {
    const viewChangeMock = jest.fn();
    render(<Menu viewChange={viewChangeMock} />);
    const noteButton = screen.getByText('calendar_month');
    fireEvent.click(noteButton);
    expect(viewChangeMock).toHaveBeenCalledWith(expect.any(Object));
  });
test('changes view when clicking on "add_box" button', () => {
    const viewChangeMock = jest.fn();
    render(<Menu viewChange={viewChangeMock} />);
    const noteButton = screen.getByText("add_box");
    fireEvent.click(noteButton);
    expect(viewChangeMock).toHaveBeenCalledWith(expect.any(Object));
  });
test('changes view when clicking on "trophy" button', () => {
    const viewChangeMock = jest.fn();
    render(<Menu viewChange={viewChangeMock} />);
    const noteButton = screen.getByText("trophy");
    fireEvent.click(noteButton);
    expect(viewChangeMock).toHaveBeenCalledWith(expect.any(Object));
  });
test('changes view when clicking on "account_circle" button', () => {
    const viewChangeMock = jest.fn();
    render(<Menu viewChange={viewChangeMock} />);
    const noteButton = screen.getByText("account_circle");
    fireEvent.click(noteButton);
    expect(viewChangeMock).toHaveBeenCalledWith(expect.any(Object));
  });


  
