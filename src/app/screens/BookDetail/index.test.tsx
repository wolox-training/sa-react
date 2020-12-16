import React from 'react';
import { cleanup, screen, waitFor, render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { BookResponse } from '../../../typings/book';
import { ROUTES } from '../../routers/constants';

import BookDetail from './';

const mockResponse: BookResponse = {
  id: 1,
  author: 'John Miedema',
  title: 'Slow reading',
  imageUrl: 'https://covers.openlibrary.org/b/id/5546156-L.jpg',
  editor: 'Litwin Books',
  year: '2009',
  genre: 'no registra'
};

const baseHistory = {
  initialEntries: [ROUTES.bookDetail.replace(':id', '1')]
};

const server = setupServer(rest.get('/books/:id', (_, res, ctx) => res(ctx.json(mockResponse))));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
  cleanup();
});

describe('BookDetail screen', () => {
  test('Can render the detail', async () => {
    const history = createMemoryHistory(baseHistory);

    render(
      <Router history={history}>
        <BookDetail />
      </Router>
    );

    await waitFor(() => screen.findAllByRole('article'));

    const title = screen.getByRole('heading', { level: 2 }) as HTMLHeadingElement;

    expect(title.innerHTML).toContain(mockResponse.title);
  });

  test('Can go home', async () => {
    const history = createMemoryHistory(baseHistory);

    render(
      <Router history={history}>
        <BookDetail />
      </Router>
    );

    await waitFor(() => screen.findAllByRole('article'));

    const link = screen.getByRole('link') as HTMLLinkElement;

    userEvent.click(link);

    await waitFor(() => screen.findByRole('link'));

    expect(history.location.pathname).toBe(ROUTES.home);
  });
});
