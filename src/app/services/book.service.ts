import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://localhost:44338/api/Book';

  // private books: Book[] = [
  //   { id: 1, name: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949, rating: 5 },
  //   { id: 2, name: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1937, rating: 4 },
  //   { id: 3, name: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960, rating: 4 },
  //   { id: 4, name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', year: 1925, rating: 4 },
  //   { id: 5, name: 'Fahrenheit 451', author: 'Ray Bradbury', genre: 'Dystopian', year: 1953, rating: 1 },
  //   { id: 6, name: 'Jane Eyre', author: 'Charlotte Brontë', genre: 'Gothic', year: 1847, rating: 1 },
  //   { id: 7, name: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', year: 1813, rating: 2 },
  //   { id: 8, name: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', year: 1951, rating: 2 }
  // ];

  constructor(private http: HttpClient) {}

  searchBooks(query: string = '', rating?: number): Observable<Book[]> {
    const params = new HttpParams().set('search', query);
    return this.http.get<Book[]>(this.apiUrl, { params });
  }
//   searchBooks(query: string = '', rating?: number): Observable<Book[]> {
//   const lowerQuery = query.toLowerCase();

//   const results = this.books.filter(book =>
//     (!query || book.title.toLowerCase().includes(lowerQuery) ||
//       book.author.toLowerCase().includes(lowerQuery) ||
//       book.genre.toLowerCase().includes(lowerQuery)) &&
//     (!rating || book.rating === rating)
//   );

//   return of(results).pipe(delay(300));
// }
}
