import api from '../config/api';
import { BooksResponse } from '../typings/book';
import { ErrorResponse } from '../typings/response';

export const getBooks = () => api.get<BooksResponse, ErrorResponse>('/books');
