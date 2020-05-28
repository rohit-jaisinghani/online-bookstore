import { Book } from './book';

export class CartItem {

    id:string;
    name:string;
    imageurl:string;
    unitprice:number;
    quantity:number;
    constructor(book:Book){
        this.id=book.id;
        this.name=book.name;
        this.imageurl=book.imageurl;
        this.unitprice=book.unitprice;
        this.quantity=1;
    }
}
