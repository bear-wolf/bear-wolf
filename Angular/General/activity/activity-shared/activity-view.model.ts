import {Period} from '@shared/models/period.model';
import {ActivityStatusEnum} from '../activity-status.enum';

export class ActivityView {
    id: string;
    version: number;
    activityType: number;
    period: Period;

    private _activityStatus: ActivityStatusEnum;

    constructor(data) {
        this.id = data.id;
        this.version = data.version;
        this.activityType = data.activityType;
        this._activityStatus = data.activityStatus;
        this.period = new Period(data.periodFrom || new Date(), data.periodTo || new Date());
    }

    get activityStatus(): string {
        return ActivityStatusEnum[this._activityStatus];
    }
}