import React from 'react';
import { cleanup, screen, waitFor, render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { LoginResponse } from '../../../typings/user';
import { ROUTES } from '../../routers/constants';
import { STATUS_CODES } from '../../../config/api';
import { ErrorResponse } from '../../../typings/response';
import { getSession } from '../../../services/LocalStorageService';

import { FORM_FIELDS } from './constants';

import Login from './';

const mockCredentials = {
  [FORM_FIELDS.email]: 'test@test.com',
  [FORM_FIELDS.password]: '123456'
};

const mockLoginResponse: LoginResponse = {
  data: {
    id: 1,
    email: mockCredentials.email,
    provider: 'email',
    uid: mockCredentials.email,
    allowPasswordChange: false,
    firstName: 'test',
    lastName: 'test',
    locale: 'en'
  }
};

const mockLoginFailure: ErrorResponse = {
  success: false,
  errors: ['Invalid login credentials. Please try again.']
};

const mockAccessToken = 'testToken';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
  cleanup();
});

const submitForm = async () => {
  const textFields = screen.getAllByRole('textbox') as HTMLInputElement[];

  for (const field of textFields) {
    userEvent.type(field, mockCredentials[field.name]);
  }

  await waitFor(() => screen.findAllByRole('textbox'));

  const buttons = screen.getAllByRole('button') as HTMLButtonElement[];

  const submitButton = buttons.find((button) => button.type === 'submit');

  if (!submitButton) {
    throw Error('Submit button not found');
  }

  userEvent.click(submitButton);

  await waitFor(() => screen.findByRole('alert'));

  expect(screen.getByRole('alert').innerHTML).toContain('loading');

  await waitFor(() => screen.findAllByRole('alert'));
};

describe('Login screen', () => {
  test('Cant send data if form is not valid', async () => {
    render(<Login />);

    const buttons = screen.getAllByRole('button') as HTMLButtonElement[];

    const submitButton = buttons.find((button) => button.type === 'submit');

    if (!submitButton) {
      throw Error('Submit Button not found');
    }

    userEvent.click(submitButton);

    await waitFor(() => screen.findAllByRole('alert'));

    const alerts = screen.getAllByRole('alert');

    const validationResult = alerts.every((alert) => alert.innerHTML.includes('requiredField'));

    expect(validationResult).toBeTruthy();
  });

  test('Can logged in successfully', async () => {
    server.use(
      rest.post('/users/sign_in', (_, res, ctx) =>
        res(ctx.set('access-token', mockAccessToken), ctx.json(mockLoginResponse))
      )
    );

    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    await submitForm();

    expect(getSession()).not.toBeNull();
  });

  test('Cant logged in if request goes wrong', async () => {
    server.use(
      rest.post('/users/sing_in', (_, res, ctx) =>
        res(ctx.status(STATUS_CODES.unauthorized), ctx.json(mockLoginFailure))
      )
    );

    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    await submitForm();

    expect(history.location.pathname).toBe(ROUTES.login);
  });

  test('Can go to SignUp screen', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    const buttons = screen.getAllByRole('button') as HTMLButtonElement[];

    const button = buttons.find((element) => element.type !== 'submit');

    if (!button) {
      throw new Error('Button not found');
    }

    userEvent.click(button);

    expect(history.location.pathname).toBe(ROUTES.signup);
  });
});
