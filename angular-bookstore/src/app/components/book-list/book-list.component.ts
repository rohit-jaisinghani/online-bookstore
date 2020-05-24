import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from 'src/app/common/book';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books:Book[];
  currentCategoryId:number;

  constructor(private _bookService:BookService,
    private _activatedRoute:ActivatedRoute) { }

  //ngonit is a lifecycle method which will call as soon as BookListComponent is created
  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listBooks();
    })
  }
  listBooks(){

    //this will return a boolean value which shows whether id is present or not
    const hasCategoryId:boolean=this._activatedRoute.snapshot.paramMap.has('id');

    if(hasCategoryId){

      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
      //+  operator will convert string into integer
    }
    else{
      this.currentCategoryId=1;
    }

    this._bookService.getBooks(this.currentCategoryId).subscribe(
      data=>this.books=data
    )
  }
}
