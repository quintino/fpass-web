import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CoreService {
    static httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) {}

    private static queryString(query: any = {}): string {
        let queryString = '';
        const keys = Object.keys(query);
        for (const key of keys) {
            queryString += (queryString ? '&' : '?') + key + '=' + query[key];
        }
        return queryString;
    }

    get<T>(url: string, query: any = {}, token: boolean = true): Observable<T> {
        return this.http.get<T>(url + CoreService.queryString(query), CoreService.httpOptions);
    }
}
