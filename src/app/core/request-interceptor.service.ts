import {Injectable} from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import md5 from 'crypto-js/md5';

@Injectable({
    providedIn: 'root',
})
export class RequestInterceptorService implements HttpInterceptor {
    private url = 'https://gateway.marvel.com/v1/public';
    private publicKey = '58c6afc0aba55ac74fc37ad8cec52b24';
    private privateKey = 'c88d424cdd0ee300cc53672f57cffa3b8aead3d1';

    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const ts = new Date().getTime();
        const requestClone = request.clone({
          headers: request.headers.set('Content-Type', 'application/json'),
          url: `${this.url}${request.url}&ts=${ts}&apikey=${this.publicKey}&hash=${md5(ts + this.privateKey + this.publicKey)}`
        });
        return next.handle(requestClone)
          .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                }
                return throwError(errorMessage);
            })
          );
    }
}
