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

    private queryString(query: any = {}, token: boolean = true) {
        let queryString = '';
        if (token) {
            const bgToken = localStorage.getItem('GHOST_TOKEN');
            if (bgToken !== undefined && bgToken !== null) {
                queryString += '?token=' + bgToken;
            }
        }
        const keys = Object.keys(query);
        for (const key of keys) {
            queryString += (queryString ? '&' : '?') + key + '=' + query[key];
        }
        return queryString;
    }

    private prepareToken(data: any = {}, token: boolean = true) {
        const bgToken = localStorage.getItem('GHOST_TOKEN');
        if (token && bgToken !== undefined && bgToken !== null) {
            delete data.token;
            data.token = bgToken;
        }
    }

    post<T>(url: string, data: any = {}, token: boolean = true): Observable<T> {
        this.prepareToken(data, token);
        return this.http.post<T>(url, data, CoreService.httpOptions);
    }

    get<T>(url: string, query: any = {}, token: boolean = true): Observable<T> {
        return this.http.get<T>(url + this.queryString(query, token), CoreService.httpOptions);
    }

    put<T>(url: string, data: any = {}, token: boolean = true): Observable<T> {
        this.prepareToken(data, token);
        return this.http.put<T>(url, data, CoreService.httpOptions);
    }

    delete<T>(url: string, query: any = {}, token: boolean = true): Observable<T> {
        return this.http.delete<T>(url + this.queryString(query, token), CoreService.httpOptions);
    }
}
