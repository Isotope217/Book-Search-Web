import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookSearchComponent } from './components/book-search/book-search.component/book-search.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [BookSearchComponent, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'book-search-web';
}
