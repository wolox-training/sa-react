import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { STATUS_CODES } from '../../../config/api';
import { SignUpResponse } from '../../../typings/user';
import { ErrorData } from '../../../typings/response';

import { FORM_FIELDS } from './constants';

import SignUp from './';

const mockUserResult: SignUpResponse = {
  id: 243,
  firstName: 'Test 12',
  lastName: 'Test 12',
  email: 'test12@tesat.com',
  locale: 'en'
};

const mockFailureResponse: ErrorData = {
  status: 'error',
  errors: {
    fullMessages: ['test error']
  }
};

const mockUserForm = {
  [FORM_FIELDS.email]: mockUserResult.email,
  [FORM_FIELDS.firstName]: mockUserResult.firstName,
  [FORM_FIELDS.lastName]: mockUserResult.lastName,
  [FORM_FIELDS.password]: '123456',
  [FORM_FIELDS.passwordConfirmation]: '123456'
};

const server = setupServer(rest.post('/users', (_, res, ctx) => res(ctx.json(mockUserResult))));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
  cleanup();
});

const submitSignUpForm = () => {
  const formFields = screen.getAllByRole('textbox') as HTMLInputElement[];
  const buttons = screen.getAllByRole('button') as HTMLButtonElement[];

  const submitButton = buttons.find((element) => element.type === 'submit');

  if (!submitButton) {
    throw new Error('Submit Button Not Found');
  }

  for (const field of formFields) {
    userEvent.type(field, mockUserForm[field.name], {
      allAtOnce: true
    });
  }

  userEvent.click(submitButton);
};

describe('SignUp screen', () => {
  test('Cant submit if form is not valid', async () => {
    render(<SignUp />);

    await waitFor(() => screen.findAllByRole('button'));

    const buttons = screen.getAllByRole('button') as HTMLButtonElement[];

    const button = buttons.find((element) => element.type === 'submit');

    expect(button?.disabled).toBeTruthy();
  });

  test('Form field shows an error', async () => {
    render(<SignUp />);

    const fields = screen.getAllByRole('textbox');

    userEvent.type(fields[0], '', {
      allAtOnce: true
    });

    await waitFor(() => screen.findByRole('alert'));

    expect(screen.getByRole('alert').innerHTML).toContain('requiredField');
  });

  test('Can send request successfully', async () => {
    render(<SignUp />);

    submitSignUpForm();

    await waitFor(() => screen.findByRole('alert'));

    expect(screen.getByRole('alert').innerHTML).toContain('loading');

    await waitFor(() => screen.findByRole('alert'));

    expect(screen.getByRole('alert').innerHTML).toContain('successful');
  });

  test('Can show if request goes wrong', async () => {
    server.use(
      rest.post('/users', (req, res, ctx) =>
        res(ctx.status(STATUS_CODES.unprocessableEntity), ctx.json(mockFailureResponse))
      )
    );

    render(<SignUp />);

    submitSignUpForm();

    await waitFor(() => screen.findByRole('alert'));

    expect(screen.getByRole('alert').innerHTML).toContain('loading');

    await waitFor(() => screen.findByRole('alert'));

    expect(screen.getByRole('alert').innerHTML).toContain(mockFailureResponse.errors.fullMessages.join(', '));
  });
});
