type BookGenre = 'no registra' | 'Sin registro';

export interface Book {
  id: number;
  author: string;
  title: string;
  imageUrl: string;
  editor: string;
  year: string;
  genre: BookGenre;
  createdAt: string;
  updatedAt: string;
}

export interface BooksResponse {
  page: Book[];
  count: number;
  totalPages: number;
  totalCount: number;
  currentPage: number;
  nextPage: null;
}
