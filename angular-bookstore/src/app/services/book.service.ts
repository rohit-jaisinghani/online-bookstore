import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl="http://localhost:8080/api/v1/books";
  //book service is observable which will emit the data
  //booklist component ts is observe/subscriber which wants the data
  constructor(private httpClient: HttpClient) { }

  getBooks():Observable<Book[]>{
    return this.httpClient.get<GetResponseBooks>(this.baseUrl).pipe(
        map(response => response._embedded.books)
    ); 
  }
  //map will help us to convert response to book[]
  //embedded will help us to unwrap the books array
}

interface GetResponseBooks{
  _embedded:{
    books:Book[];
  }
  //this will help to wrap books from json response
}
