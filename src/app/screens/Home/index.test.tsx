import React from 'react';
import { cleanup, screen, waitFor, render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { BooksResponse } from '../../../typings/book';
import { getSession, saveSession } from '../../../services/LocalStorageService';
import { ROUTES } from '../../routers/constants';

import Home from './';

const mockSession = () => {
  saveSession({
    token: 'testToken',
    client: 'testClient',
    uid: 'test@test.com'
  });
};

const mockResponse: BooksResponse = {
  page: [
    {
      id: 1,
      author: 'John Miedema',
      title: 'Slow reading',
      imageUrl: 'https://covers.openlibrary.org/b/id/5546156-L.jpg',
      editor: 'Litwin Books',
      year: '2009',
      genre: 'no registra',
      createdAt: '2020-05-07T01:43:29.970Z',
      updatedAt: '2020-05-07T01:43:29.970Z'
    },
    {
      id: 2,
      author: 'Adam West,Jeff Rovin',
      title: 'Back to the Batcave',
      imageUrl: 'https://covers.openlibrary.org/b/id/270628-L.jpg',
      editor: 'Berkley Books',
      year: '1994',
      genre: 'no registra',
      createdAt: '2020-05-07T01:58:19.941Z',
      updatedAt: '2020-05-07T01:58:19.941Z'
    }
  ],
  count: 2,
  totalPages: 1,
  totalCount: 2,
  currentPage: 1,
  nextPage: null
};

const server = setupServer(rest.get('/books', (_, res, ctx) => res(ctx.json(mockResponse))));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
  cleanup();
});

describe('Home screen', () => {
  mockSession();

  test('Can get data to the list', async () => {
    render(<Home />);

    await waitFor(() => screen.findAllByRole('listitem'));

    const items = screen.getAllByRole('listitem');

    expect(items.length).toBe(mockResponse.page.length);
  });

  test('Can logout', async () => {
    const history = createMemoryHistory({
      initialEntries: [ROUTES.home]
    });

    render(
      <Router history={history}>
        <Home />
      </Router>
    );

    await waitFor(() => screen.findAllByRole('listitem'));

    const button = screen.getByRole('button') as HTMLButtonElement;

    userEvent.click(button);

    await waitFor(() => screen.findAllByRole('button'));

    expect(getSession()).toBeNull();
    expect(history.location.pathname).toBe(ROUTES.login);
  });
});
