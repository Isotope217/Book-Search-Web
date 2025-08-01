import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  addBookForm = new FormGroup({
    name: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    rating: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)])
  });

  books: Book[] = [];
  ratings: number[] = [5, 4, 3, 2, 1];
  loading = false;
  error = '';

  private bookService = inject(BookService);

  ngOnInit(): void {
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
        this.error = '';
      },
      error: () => {
        this.books = [];
        this.loading = false;
        this.error = 'Failed to fetch books.';
      }
    });
  }

  addBook(): void {
    if (this.addBookForm.invalid) return;

    const newBook: Book = {
      name: this.addBookForm.value.name!,
      author: this.addBookForm.value.author!,
      price: Number(this.addBookForm.value.price),
      rating: Number(this.addBookForm.value.rating)
    };

    this.bookService.addBook(newBook).subscribe({
      next: (addedBook) => {
        const hasFilters = this.searchControl.value || this.ratingControl.value;

        if (hasFilters) {
          this.searchControl.setValue('');
          this.ratingControl.setValue('');
        } else {
          this.books.push(addedBook);
        }

        this.addBookForm.reset();
      },
      error: () => {
        this.error = 'Failed to add book.';
      }
    });
  }
}
