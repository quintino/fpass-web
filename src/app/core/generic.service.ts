import {CoreService} from './core.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GenericService<T> {
    service: CoreService;
    url = '';

    get(nameStartsWith: string): Observable<T> {
        return this.service.get<T>('/' + this.url, {nameStartsWith});
    }

}
