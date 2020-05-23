import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from 'src/app/common/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books:Book[];
  constructor(private _bookService:BookService) { }

  //ngonit is a lifecycle method which will call as soon as BookListComponent is created
  ngOnInit() {
    this.listBooks();
  }
  listBooks(){
    this._bookService.getBooks().subscribe(
      data=>this.books=data
    )
  }
}
