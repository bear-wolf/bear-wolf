import {Component, Input, OnInit} from '@angular/core';
import {CommonInner} from "@shared/components/common-inner.component";
import {JointAgreement} from "../joint-agreement.model";
import {FormBuilder} from "@angular/forms";
import {Activity} from "../../activity.model";
import {iColumns} from "@shared/modules/common-list-form/models";
import {ActivityService} from "../../activity.service";
import * as moment from 'moment';
import {Configuration} from '@shared/modules/outer-config/models/config';

@Component({
  selector: 'app-activity-joint-agreement-list',
  templateUrl: './activity-joint-agreement-list.component.html',
  styleUrls: ['./activity-joint-agreement-list.component.scss']
})
export class ActivityJointAgreementListComponent extends CommonInner implements OnInit {
  @Input()
  jointAgreement: JointAgreement;
  
  activity: Activity[];

  filter: any;

  columns: iColumns[] = [
    {field: 'id', header: '№', search: true, width: 100},
    {field: 'pharmacyNetwork', header: 'AC', search: true, sortable: true, width: 150},
    {field: 'userKAM', header: 'KAM', search: true, width: 150},
    {field: 'userAKAM', header: 'AKAM', search: true, width: 150},
    {field: 'dateCreated', header: 'Дата создания', search: true, classList: ['text-center'], width: 120},
    {field: 'period', header: 'Период', classList: ['text-center'], width: 120},
    {field: 'activityType', header: 'Тип активности', search: true, width: 200},
    {field: 'marketPlan', header: 'Маркет план', search: true, width: 150},
    {field: 'activityStatus', header: 'Статус', search: true, width: 150},
    {field: 'actions', header: 'Действия', classList: ['text-center']}
  ];
  
  constructor(
      public fb: FormBuilder,
      public activityService: ActivityService,
) {
    super(fb);
  }
  
  ngOnInit() {
    this.filter = {
      marketingPlanId: this.jointAgreement.marketingPlanId,
      periodFrom: moment(this.jointAgreement.period.from).format(Configuration.format.server),
      periodTo: moment(this.jointAgreement.period.to).format(Configuration.format.server),
      jointAgreement: true
    };

    this.get();
  }
  
  get() {
    this.activityService.getJointAgreement(this.jointAgreement.marketingPlanId,
        moment(this.jointAgreement.period.from).format(Configuration.format.server),
        moment(this.jointAgreement.period.to).format(Configuration.format.server))
        .subscribe((item: Activity[]) => {
          if (item && item.length) {
            this.activity = item;
          }
        });
  }

  submit() {
  }
}
