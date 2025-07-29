import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../../models/book';
import { combineLatest, debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-book-search',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss'
})
export class BookSearchComponent implements OnInit {
  searchControl = new FormControl('');
  ratingControl = new FormControl('');
  books: Book[] = [];
  loading = false;
  error = '';

  private bookService = inject(BookService);

  ngOnInit(): void {
    // Combine both filters to drive search logic
    combineLatest([
      this.searchControl.valueChanges.pipe(startWith(''), debounceTime(300), distinctUntilChanged()),
      this.ratingControl.valueChanges.pipe(startWith(''), distinctUntilChanged())
    ])
    .pipe(
      switchMap(([query, rating]) => {
        this.loading = true;
        this.error = '';
        const ratingValue = rating ? parseInt(rating, 10) : undefined;
        return this.bookService.searchBooks(query || '', ratingValue);
      })
    )
    .subscribe({
      next: (results) => {
        this.books = results;
        this.loading = false;
        this.error = results.length === 0 ? 'No books found.' : '';
      },
      error: () => {
        this.books = [];
        this.loading = false;
        this.error = 'Failed to fetch books.';
      }
    });
  }
}
