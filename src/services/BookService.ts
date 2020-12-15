import api from '../config/api';
import { BookResponse, BooksResponse } from '../typings/book';
import { ErrorResponse, SingleErrorResponse } from '../typings/response';

export const getBooks = () => api.get<BooksResponse, ErrorResponse>('/books');

export const getBook = (id: string) => api.get<BookResponse, SingleErrorResponse>(`/books/${id}`);
