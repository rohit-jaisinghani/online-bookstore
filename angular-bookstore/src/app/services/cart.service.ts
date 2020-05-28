import { CartItem } from './../common/cart-item';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  

  cartItems:CartItem[]=[];
  //subject is used to establish events like here totalquantity and totalprice are used to calculate .next() will be used to use this method
  totalPrice:Subject<number>=new Subject<number>();
  totalQuantiy:Subject<number>=new Subject<number>();

  constructor() { }

  addToCart(theCartItem:CartItem){
    let alreadyExistsInCart:boolean=false;
    let existingCartItem:CartItem=undefined;

    if(this.cartItems.length>0){
      //find the book/item in the cart based on the id
      existingCartItem=this.cartItems.find(tempCartItem=> tempCartItem.id===theCartItem.id);
      alreadyExistsInCart=(existingCartItem!=undefined)
    }

     if(alreadyExistsInCart){
       //increment the quantity
       existingCartItem.quantity++;
     }
     else{
       //add to the cart item array
       this.cartItems.push(theCartItem);
     }
     this.calculateTotalPrice();
  }
  calculateTotalPrice() {
   //
   let totalPriceValue:number=0;
   let totalQuantityValue:number=0;
   for(let currentCartItem of this.cartItems){
     totalPriceValue+=currentCartItem.quantity*currentCartItem.unitprice;
     totalQuantityValue+=currentCartItem.quantity;
   }
   //publish the events so that other class can use these values
   this.totalPrice.next(totalPriceValue);
   this.totalQuantiy.next(totalQuantityValue);
  }
  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if(cartItem.quantity===0){
      this.remove(cartItem);
    }
    else{
      this.calculateTotalPrice();
    }
    this.calculateTotalPrice();
  }
  remove(cartItem:CartItem){
    const itemIndex=this.cartItems.findIndex((tempCartItem)=> tempCartItem.id===cartItem.id);

    if(itemIndex>-1){
      //splice method contains two parameters one index and second no of items to remove
      this.cartItems.splice(itemIndex,1);
      this.calculateTotalPrice(); 
    }

  }
}
