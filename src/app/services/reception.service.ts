import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EReception } from 'src/app/models/Ereception.model';
@Injectable()
export class ReceptionService {
    constructor(private http: HttpClient) { }
    url = 'http://localhost:49804/api/reception/';
    postVisitor(reception: EReception): Observable<EReception> {
        return this.http.post<EReception>(this.url+ 'newvisitor', reception);
    }
    putVisitor(id, visitor): Observable<EReception> {
        return this.http.put<EReception>(this.url + 'updatevisitor' ,
            visitor);
    }

    putVisitorTime(visitor): Observable<EReception> {
        return this.http.put<EReception>(this.url + 'updatevisitorOutTime',
            visitor);
    }

    getVisitorList(): Observable<EReception[]> {
        console.log("getVisitor'slist");
        return this.http.get(this.url + 'Visitors')
            .pipe(map(res => <EReception[]>res));
    }
    getVisitorListById(id) {
        return this.http.get(this.url + 'visitors/' + id)
            .pipe(map(res => <EReception[]>res));
    }

    deleteVisitor(id: number) {
        return this.http.delete(this.url + 'deleteVisitor/' + id);
    }
}
