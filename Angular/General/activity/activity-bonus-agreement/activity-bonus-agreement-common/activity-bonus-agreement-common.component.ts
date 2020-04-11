import {Component, Input, OnInit, ViewChildren} from '@angular/core';
import {BonusAgreement} from '../bonus-agreement.model';
import {CommonInner} from '@shared/components/common-inner.component';
import {DataService} from '@shared/services/data.service';
import {iOption} from '@shared/models/option.model';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-activity-bonus-agreement-common',
    templateUrl: './activity-bonus-agreement-common.component.html',
    styleUrls: ['./activity-bonus-agreement-common.component.scss']
})
export class ActivityBonusAgreementCommonComponent extends CommonInner implements OnInit{
    @Input()
    bonusAgreement: BonusAgreement;

    @ViewChildren('innerFormComponent') children: CommonInner[];
    getListTrue: iOption[];

    constructor(
        public fb: FormBuilder,
        public dataService: DataService) {

        super(fb);
        this.getListTrue = this.dataService.getListTrue();
    }

    ngOnInit(): void {
        super.ngOnInit(this.bonusAgreement);
    }

    submit() {
        this.children.forEach((child: CommonInner) => {
            child.submit();
        });
    }
}
