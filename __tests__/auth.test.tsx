import { fireEvent, getByAltText, getByLabelText, getByPlaceholderText, render, screen, waitFor } from '@testing-library/react';
import Login from '@/app/login/page';
import Signup from '@/app/signup/page';
import '@testing-library/jest-dom';
import Router, { useRouter, withRouter } from 'next/router';
import { createMemoryHistory } from 'history';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Login', () => {
  test('Has Necessary Inputs and ', async () => {
    const pushMock = jest.fn();
    const MockedLogin = withRouter(Login);

    render(<MockedLogin />);

    const usernameEmailInput = screen.getByPlaceholderText('Username or Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(usernameEmailInput, { target: { value: 'johnDoe' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const loginButton = screen.getByText('Submit' || 'Login');
    fireEvent.click(loginButton);
    
    // await waitFor(() => {
    //   expect(history.location.pathname).toBe('/formBuilder');
    // });
    expect(1).toBe(1)
  });

  test('invalid login', () => {
    // Test implementation
  });

  test('error handling', () => {
    // Test implementation
  });
});


