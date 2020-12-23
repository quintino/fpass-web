import {CoreService} from './core.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GenericService<T> {
    service: CoreService;
    url = '';

    get(id: string, token: string = '', isPublic: boolean = false): Observable<T> {
        return this.service.post<T>('/' + this.url, {id, token, public: isPublic}, token === '');
    }

    list(isPublic = false): Observable<T[]> {
        return this.service.post<T[]>('/' + this.url + '/list', {public: isPublic});
    }

    create(obj: T): Observable<T> {
        return this.service.post<T>('/' + this.url + '/create', obj);
    }

    update(obj: T): Observable<T> {
        return this.service.post<T>('/' + this.url + '/update', obj);
    }

    delete(obj: T): Observable<T> {
        return this.service.post<T>('/' + this.url + '/delete', obj);
    }
}
