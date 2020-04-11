import {iPageInfo, Pagination} from '@shared/models/pagination.model';
import {Activity} from '../activity.model';
import {ActivityService} from '../activity.service';

export class ListActivity extends Pagination {
    activities: Activity[];
    private _activityService: ActivityService;
    marketingPlanId: number;

    constructor(list: Activity[], pageInfo: iPageInfo, service: any) {
        super(pageInfo);

        this.activities = list;
        this._activityService = service;
    }

    set service(service: ActivityService) {
        this._activityService = service;
    }

    get service() {
        return this._activityService;
    }
}