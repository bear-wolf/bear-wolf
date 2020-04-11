import {Component, Input, OnInit, SimpleChanges, ViewChildren} from '@angular/core';
import {DrugInformationGroup} from '../../activity-shared/drug-information-group.model';
import {CommonInner} from '@shared/components/common-inner.component';
import {DrugInformation} from '../../activity-volume-agreement/drug-information.model';
import {DataService} from '@shared/services/data.service';
import {FormBuilder} from '@angular/forms';
import {BonusAgreement} from '../bonus-agreement.model';
import {BonusAgreementGroup} from '../bonus-agreement-group';
import {AgreementDetailComponent} from '@shared/components/agreement-drug/agreement-detail/agreement-detail.component';

@Component({
    selector: 'app-activity-bonus-agreement-drugs-details',
    templateUrl: './activity-bonus-agreement-drugs-details.component.html',
    styleUrls: ['./activity-bonus-agreement-drugs-details.component.scss']
})
export class ActivityBonusAgreementDrugsDetailsComponent extends CommonInner implements OnInit {
    @Input()
    bonusAgreement: BonusAgreement;
    @ViewChildren('innerFormComponent') children: CommonInner[];

    drugInformation: DrugInformation;
    drugInformationGroup: BonusAgreementGroup;

    @ViewChildren(AgreementDetailComponent) detailComponents: AgreementDetailComponent[];

    constructor(
        public dataService: DataService,
        public fb: FormBuilder
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit(this.bonusAgreement);

        this.drugInformationGroup = this.bonusAgreement.drugInformationGroup[0];
        this.drugInformation = this.bonusAgreement.drugInformationGroup[0].drugInformation[0];
        this.buildForm({
            empty: []
        });
    }

    selected(drugInformation: any): void {
        this.drugInformation = drugInformation;

        if (!this.drugInformationGroup) {
            this.drugInformationGroup = this.bonusAgreement.drugInformationGroup.filter(item => item.name === drugInformation.groupName)[0];
        }
    }

    selectedGroup(drugInformationGroup: any): void {
      if (drugInformationGroup !== -1) {
        this.drugInformationGroup = drugInformationGroup;
      }
    }

    submit() {
        this.children.forEach((child: CommonInner) => {
            child.submit();
        });
    }

    setFillForm(item) {
        if (!item) {
            return;
        }

        const group = item.drugInformationGroup.find(g => g.name === this.drugInformation.groupName);
        const drug = group.drugInformation.find(i => i.skuId === this.drugInformation.skuId);
        const comp = this.detailComponents.find(c => c.drug.skuId === this.drugInformation.skuId);

        comp.form.patchValue(drug);
    }
}
