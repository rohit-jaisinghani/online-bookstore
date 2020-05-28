import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book:Book=new Book();

  constructor(private _activatedRoute:ActivatedRoute,
    private _bookService:BookService,
    private _cartServce:CartService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(
      ()=>{
        this.getBookInfo();
      }
    )
  }

getBookInfo(){
  const id:number=+this._activatedRoute.snapshot.paramMap.get('id');
  this._bookService.get(id).subscribe(
    data=>{
      this.book=data;
    }
  )
}
addToCart(){
  const cartItem=new CartItem(this.book);
  this._cartServce.addToCart(cartItem);

}
}
