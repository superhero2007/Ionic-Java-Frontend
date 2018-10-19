import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Author } from './author.model';

@Injectable()
export class AuthorService {
    private resourceUrl = Api.API_URL + '/authors';

    constructor(private http: HttpClient) { }

    create(author: Author): Observable<Author> {
        return this.http.post(this.resourceUrl, author);
    }

    update(author: Author): Observable<Author> {
        return this.http.put(this.resourceUrl, author);
    }

    find(id: number): Observable<Author> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
