type BookGenre = 'no registra' | 'Sin registro';

export interface Book {
  id: number;
  author: string;
  title: string;
  image_url: string;
  editor: string;
  year: string;
  genre: BookGenre;
  created_at: string;
  updated_at: string;
}

export interface BooksResponse {
  page: Book[];
  count: number;
  total_pages: number;
  total_count: number;
  current_page: number;
}
