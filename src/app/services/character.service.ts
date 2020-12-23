import {Injectable} from '@angular/core';
import {Character} from '../entities/character';
import {GenericService} from '../core/generic.service';
import {CoreService} from '../core/core.service';

@Injectable({
    providedIn: 'root',
})
export class CharacterService extends GenericService<Character> {

    constructor(private core: CoreService) {
        super();
        super.service = this.core;
        super.url = 'character';
    }

}
