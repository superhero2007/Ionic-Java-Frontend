import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Book } from './book.model';

@Injectable()
export class BookService {
    private resourceUrl = Api.API_URL + '/books';

    constructor(private http: HttpClient) { }

    create(book: Book): Observable<Book> {
        return this.http.post(this.resourceUrl, book);
    }

    update(book: Book): Observable<Book> {
        return this.http.put(this.resourceUrl, book);
    }

    find(id: number): Observable<Book> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
