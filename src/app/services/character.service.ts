import {Injectable} from '@angular/core';
import {CoreService} from './core.service';
import {BrokeredProfile} from '../../entities/brokered-profile-entity';
import {Observable} from 'rxjs';
import {Talent} from '../../entities';
import {SharedService} from './shared.service';
import {EventList} from '../../entities/event-list';
import {SplitListService} from '../utilities/split-list.service';

@Injectable({
    providedIn: 'root',
})
export class BrokeredService extends SplitListService<BrokeredProfile> {
    bookings: Talent[];
    roosters: BrokeredProfile[];
    accepted: BrokeredProfile[];
    invited: BrokeredProfile[];

    constructor(private core: CoreService, public shared: SharedService) {
        super(shared);
        super.service = this.core;
        super.url = 'profile/brokered';
    }

    listRoosters(agent) {
        this.roosters = [];
        this.accepted = [];
        this.invited = [];
        this.listByAgent(agent).subscribe(list => {
            this.roosters = list;
            for (const item of list) {
                if (item.brokeredProfile.active) {
                    if (item.brokeredProfile.pending) {
                        this.invited.push(item);
                    } else {
                        this.accepted.push(item);
                    }
                }
            }
        });
    }

    listByAgent(agent): Observable<BrokeredProfile[]> {
        return this.service.post<BrokeredProfile[]>('/profile/brokered/agent', {agent, active: true});
    }

    updateBookingList(profile: string, filter: string = '') {
        this.listByAgent(profile).subscribe(list => {
            this.bookings = [];
            if (this.shared.checkObject(list)) {
                for (const project of list) {
                    if (project.brokeredProfile.profile.name === 'profile.artist') {
                        const prj = JSON.parse(JSON.stringify(project.brokeredProfile));
                        delete prj.events;
                        for (const event of project.brokeredProfile.events) {
                            const evt = JSON.parse(JSON.stringify(event));
                            delete evt.talents;
                            // @ts-ignore
                            for (const talent of event.talents) {
                                talent.event = evt;
                                talent.event.profile = prj;
                                this.bookings.push(talent);
                            }
                        }
                    }
                }
                this.split(this.bookings, true);
            }
        });
    }
}
