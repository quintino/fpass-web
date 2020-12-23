import {Injectable} from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import {Env} from '../../../env';
import { SharedService } from './shared.service';
import {UserService} from "./user.service";

@Injectable({
    providedIn: 'root',
})
export class RequestInterceptorService implements HttpInterceptor {
    // private baseURL = 'https://b2in.herokuapp.com';
    // private baseURL = 'https://blueghost-web-api-dev.appspot.com';
    // private baseURL = 'https://localhost:3000';
    // private baseURL = 'https://192.168.11.106:3000';

    constructor(private sharedService: SharedService, private userService: UserService) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let requestClone = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
        if (requestClone.url.indexOf('assets') < 0 && requestClone.url.indexOf('files') < 0) {
            requestClone = requestClone.clone({url: `${Env.baseURL}${requestClone.url}`});
        }
        const user = JSON.parse(localStorage.getItem('GHOST_USER'));
        if (user && user.token) {
            requestClone = requestClone.clone({
                body: {...requestClone.body, token: user.token},
            });
        }
        // return next.handle(request).pipe(
        //     map((event: HttpEvent<any>) => {
        //         return event;
        //     })
        // );
        return next.handle(requestClone)
          .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.sharedService.callRouter('/401');
                } else if (error.status === 404) {
                    this.sharedService.callRouter('/404');
                } else if (error.status === 410) {
                    this.userService.token(user.id).subscribe(obj => {
                        user.token = obj.token;
                        this.sharedService.emitUserObjChanged(user);
                        this.intercept(request, next);
                        return;
                    });
                    // this.sharedService.callRouter('/user/login');
                }
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                }
                // window.alert(errorMessage);
                return throwError(errorMessage);
            })
          );
    }
}
