import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://localhost:44338/api/Book';

  private http = inject(HttpClient);

  searchBooks(query: string = '', rating?: number): Observable<Book[]> {
    let params = new HttpParams();

    if (query) {
      params = params.set('search', query);
    }

    if (rating !== undefined && rating !== null) {
      params = params.set('rating', rating.toString());
    }

    return this.http.get<Book[]>(this.apiUrl, { params });
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

}
