import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl="http://localhost:8080/api/v1/books";
  private categoryUrl="http://localhost:8080/api/v1/book-category";
  
  //book service is observable which will emit the data
  //booklist component ts is ob serve/subscriber which wants the data
  constructor(private httpClient: HttpClient) { }

  getBooks(theCategoryId:number):Observable<Book[]>{
    const searchUrl=`${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
    return this.getBooksList(searchUrl)
  };
  private getBooksList(searchUrl: string): Observable<Book[]> {
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(map(response => response._embedded.books));
  }

  getBookCategories():Observable<BookCategory[]>{
    return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCategory)
    );
  }
  //map will help us to convert response to book[]
  //embedded will help us to unwrap the books array
  searchBooks(keyword:string):Observable<Book[]>{
    const searchUrl=`${this.baseUrl}/search/searchbykeyword?name=${keyword}`;
    return this.getBooksList(searchUrl);

  };

  get(bookId:number):Observable<Book>{
     const bookDetailsUrl=`${this.baseUrl}/${bookId}`;
     return this.httpClient.get<Book>(bookDetailsUrl);

  }
}

interface GetResponseBooks{
  _embedded:{
    books:Book[];
  }
  //will map the json response
  //this will help to wrap books from json response
}
interface GetResponseBookCategory{
  _embedded:{
    bookCategory:BookCategory[];
  }
}


