import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Activity} from './activity.model';
import * as moment from 'moment';
import {DatePipe} from '@shared/modules/pipes/pipes/date.pipe';
import {ActivityTypeEnum} from './activity-type.enum';
import {ActivitySearchParams} from './activity-search-params.model';
import {ListUser} from '../user/components/user-list/list-user.model';
import {iPagination, Pagination} from '@shared/models/pagination.model';
import {User} from '@shared/models/user.model';
import {ListActivity} from './activity-shared/list-activity.model';
import {TrainingService} from './activity-training/training.service';
import {BasicMarketingService} from './activity-basic-marketing/basic-marketing.service';
import {JointAgreementService} from './activity-joint-agreement/joint-agreement.service';
import {VolumeAgreementService} from './activity-volume-agreement/volume-agreement.service';
import {BonusAgreementService} from './activity-bonus-agreement/bonus-agreement.service';
import {ECommerceService} from './activity-e-commerce/e-commerce.service';
import {DmaService} from './activity-dma/dma.service';
import {JointAgreement} from './activity-joint-agreement/joint-agreement.model';
import {BasicMarketing} from './activity-basic-marketing/basic-marketing.model';
import {VolumeAgreement} from './activity-volume-agreement/volume-agreement.model';
import {BonusAgreement} from './activity-bonus-agreement/bonus-agreement.model';
import {Dma} from './activity-dma/dma.model';
import {Training} from './activity-training/training.model';
import {ECommerce} from './activity-e-commerce/e-commerce.model';
import {ActivityView} from './activity-shared/activity-view.model';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    activitiesSubject: BehaviorSubject<Activity[]> = new BehaviorSubject<Activity[]>([]);
    filter: BehaviorSubject<ListActivity> = new BehaviorSubject<ListActivity>(null);
    datePipe: DatePipe;

    constructor(
        private http: HttpClient,
        private trainingService: TrainingService,
        private basicMarketingService: BasicMarketingService,
        private jointAgreementService: JointAgreementService,
        private volumeAgreementService: VolumeAgreementService,
        private bonusAgreementService: BonusAgreementService,
        private eCommerceServicee: ECommerceService,
        private dmaService: DmaService,
    ) {
    }

    getFilterAsObservable(): Observable<ListActivity> {
        return this.filter.asObservable();
    }

    setDatePipe(pipe: DatePipe) {
        this.datePipe = pipe;
        return this;
    }

    getAll(): Observable<Activity[]> {
        // @TODO here we can implement cache logic if needed
        this.http.get('Activity/getAll').pipe(
            map((response: any) => {
                const result: Activity[] = [];

                response.forEach((item: any) => {
                    item.periodTo = moment(item.periodTo);
                    item.periodFrom = moment(item.periodFrom);
                    result.push(new Activity(item));
                });

                return result;
            })
        ).subscribe((activity: Activity[]) => {
            this.activitiesSubject.next(activity);
        });

        return this.activitiesSubject.asObservable();
    }

    getAllByMarketingPlanId(marketingPlanId: number): Observable<ActivityView[]> {
        return this.http.get<ActivityView[]>(`Activity/getAll/${marketingPlanId}`).pipe(
            map((item: any[]) => {
                const list: ActivityView[] = [];

                (item || []).forEach((_item: any) => {
                    list.push(new ActivityView(_item));
                });

                return list;
            }));
    }

    // getAllForPage(page: number, pageSize: number): Observable<ListActivity> {
    //     return this.getFiltered
    //     // return this.http.post(`Activity/GetFiltered?page=${page}&pageSize=${pageSize}`, {})
    //     //     .pipe(
    //     //         map((response: iPagination) => {
    //     //             const list: Activity[] = [];
    //     //
    //     //             response.itemsPerPage.forEach((item: any) => {
    //     //                 item.periodTo = moment(item.periodTo);
    //     //                 item.periodFrom = moment(item.periodFrom);
    //     //                 list.push(new Activity(item));
    //     //             });
    //     //
    //     //             return new ListActivity(list, response.pageInfo, this);
    //     //         })
    //     //     );
    // }

    getFilteredByConditions(data: any, pagination: Pagination): Observable<any> {
        const param: string = pagination ? `page=${pagination.pageNumber}&pageSize=${pagination.pageSize}` : '';
        return this.http.post(`activity/getFilteredByConditions?${param}`, data)
            .pipe(
                map((response: iPagination) => {
                    const list: Activity[] = [];
                    response.itemsPerPage.forEach((item: any) => {
                        item.periodTo = moment(item.periodTo);
                        item.periodFrom = moment(item.periodFrom);
                        list.push(new Activity(item));
                    });
                    this.filter.next(new ListActivity(list, response.pageInfo, this));
                })
            );
    }

    getJointAgreement(marketingPlanId: number, periodFrom: string, periodTo: string): Observable<Activity[]> {
        // @TODO here we can implement cache logic if needed
        this.http.get(`Activity/GetActivityForJointAgreement/?marketingPlanId=${marketingPlanId}&periodFrom=${periodFrom}&periodTo=${periodTo}`).pipe(
            map((response: any) => {
                const result: Activity[] = [];

                (response.itemsPerPage).forEach((item: any) => {
                    item.periodTo = moment(item.periodTo);
                    item.periodFrom = moment(item.periodFrom);
                    result.push(new Activity(item));
                });

                return result;
            })
        ).subscribe((activity: Activity[]) => {
            this.activitiesSubject.next(activity);
        });

        return this.activitiesSubject.asObservable();
    }

    getFiltered(filter: ActivitySearchParams, pagination?: Pagination) {
        const param: string = pagination ? `page=${pagination.pageNumber}&pageSize=${pagination.pageSize}` : '';

        return this.http.post(`Activity/GetFiltered?${param}`, filter)
            .pipe(
            map((response: any) => {
                const result: Activity[] = [];

                response.itemsPerPage.forEach((item: any) => {
                    item.periodTo = moment(item.periodTo);
                    item.periodFrom = moment(item.periodFrom);
                    result.push(new Activity(item));
                });
                const instance = new ListActivity(result, response.pageInfo, this)
                instance.marketingPlanId = filter.marketingPlanId;

                return instance;
            })
        );
    }

    getById(type: ActivityTypeEnum, id: string, version: string): Observable<Activity> {
        return this.http.get<Activity>(`${ActivityTypeEnum[type].toString()}/${id}/${version}`);
    }

    create(marketPlanObj: object): Observable<any> {
        return this.http.post('Activity/Create', marketPlanObj).pipe(
            map(() => {
                this.getAll();
            })
        );
    }

    update(activity: object): Observable<any> {
        return this.http.put(`Activity/${activity['id']}`, activity).pipe(
            map(() => {
                this.getAll();
            })
        );
    }

    delete(activityId: number, activityType: ActivityTypeEnum): Observable<any> {
        return this.http.delete(`${ActivityTypeEnum[activityType]}/${activityId}`);
    }

}
