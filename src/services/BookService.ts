import api from '../config/api';
import { BooksResponse } from '../typings/book';
import { ErrorResponse } from '../typings/response';
import { getSession } from '../utils/session';

export const getBooks = () => {
  const session = getSession();

  if (!session) {
    throw new Error('Session not found');
  }

  api.setHeader('uid', session.uid);
  api.setHeader('client', session.client);
  api.setHeader('access-token', session.token);

  return api.get<BooksResponse, ErrorResponse>('/books');
};
