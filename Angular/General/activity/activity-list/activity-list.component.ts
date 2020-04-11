import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@shared/modules/pipes/pipes/date.pipe';
import {Activity} from '../activity.model';
import {ActivityService} from '../activity.service';
import {MarketingPlan} from '../../marketing-plan/marketing-plan.model';
import {MarketingPlanFormComponent} from '../../marketing-plan/marketing-plan-form/marketing-plan-form.component';
import {MarketingPlanDeleteComponent} from '../../marketing-plan/marketing-plan-delete/marketing-plan-delete.component';
import {ActivityDeleteComponent} from '../activity-shared/activity-delete/activity-delete.component';
import {Configuration} from '@shared/modules/outer-config/models/config';
import {Pagination} from '@shared/models/pagination.model';
import {takeUntil} from 'rxjs/operators';
import {ListUser} from '../../user/components/user-list/list-user.model';
import {CommonListComponent} from '@shared/components/common-list.component';
import {ListActivity} from '../activity-shared/list-activity.model';
import {iColumns} from '@shared/models/columns.model';
import {ColumnTypeEnum} from '@shared/models/column-type.enum';

@Component({
    selector: 'app-activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent extends CommonListComponent implements OnInit {
    @Input()
    header: boolean = true;

    @Input()
    innerPage: boolean = false;

    @Input()
    isFilter: boolean = true;

    @Input()
    activity: Activity[];

    @Input()
    filter: any;

    configuration = Configuration;

    listActivity: ListActivity;

    columns: iColumns[] = [
        {field: '#', header: '#', type: ColumnTypeEnum.Number, width: 70},
        {field: 'id', header: 'ID', type: ColumnTypeEnum.Number, width: 300, search: true },
        {field: 'pharmacyNetwork', header: 'AC', type: ColumnTypeEnum.String, search: true, sortable: true},
        {field: 'userKAM', header: 'KAM', type: ColumnTypeEnum.String, search: true},
        {field: 'userAKAM', header: 'AKAM', type: ColumnTypeEnum.String, search: true},
        {field: 'created', header: 'Дата создания', search: true, classList: ['text-center'], width: 120},
        {field: 'period', header: 'Период', classList: ['text-center'], width: 120},
        {field: 'activityType', header: 'Тип активности', type: ColumnTypeEnum.Number, search: true},
        {field: 'marketPlan', header: 'Маркет план', type: ColumnTypeEnum.Number, search: true, width: 150},
        {field: 'activityStatus', header: 'Статус', search: true, width: 150},
        {field: 'actions', header: 'Действия', classList: ['text-center'], width: 150}
    ];

    constructor(
        public router: Router,
        public activityService: ActivityService,
        public datePipe: DatePipe,
        private modalService: NgbModal
    ) {
        super();
        this.activityService.setDatePipe(datePipe);
    }

    ngOnInit() {
        // here
        if (!this.activity) {
            this.query(this.pagination);
        } else {
            this.listActivity = new ListActivity(this.activity, null, this.activityService);
        }

        this.activityService.getFilterAsObservable().subscribe((list) => {
            if (list) {
                this.listActivity = list;
            }
        });
    }

    query(pagination: Pagination) {
        this.activityService.getFiltered(this.filter || {}, pagination)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: ListActivity) => {
                if (data) {
                    this.listActivity = data;
                    this.pagination.value = data;
                }
            });
    }

    // run search from table
    onSearch(value: any) {
        this.activityService.getFiltered(value).subscribe((data) => {
            if (data) {
                this.listActivity = data;
                this.pagination.value = data;
            }
        });
    }

    openEditDialog(marketPlan: MarketingPlan) {
        const modalRef = this.modalService.open(MarketingPlanFormComponent);
        modalRef.componentInstance.title = 'Редактирование маркет плана ' + marketPlan.id;
        modalRef.componentInstance.marketPlan = marketPlan;
    }

    editActivity(activity: Activity) {
        const id = activity.id;
        const route = `${activity.getActivityRoute()}/${id}/${activity.version}`;
        this.router.navigate([route], {
            queryParams: {
                mpid: activity.marketingPlanId
            }
        });
    }

    openDeleteDialog(activity: Activity): void {
        const modalRef = this.modalService.open(ActivityDeleteComponent);
        modalRef.componentInstance.activity = activity;
        modalRef.result.then((data: any | boolean) => {
            if (data === true) {
                this.query(this.pagination);
            }
            // on close
        }, (reason) => {
            // on dismiss
        });
    }

    add() {
        // const modalRef = this.modalService.open(UserAddComponent);
        // modalRef.componentInstance.title = 'Создание нового пользователя';
    }
}
