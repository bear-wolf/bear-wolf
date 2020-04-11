import {Component, Input, OnInit, ViewChildren, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import {DataService} from '@shared/services/data.service';
import { FormArray, FormBuilder } from '@angular/forms';
import {VolumeAgreement} from '../volume-agreement.model';
import {DrugInformation} from '../drug-information.model';
import {DrugInformationGroup} from '../../activity-shared/drug-information-group.model';
import {AgreementDetailComponent} from '@shared/components/agreement-drug/agreement-detail/agreement-detail.component';
import {AgreementScaleComponent} from '@shared/components/agreement-drug/agreement-scale/agreement-scale.component';
import {ScalesList} from '../scales-list.model';

@Component({
    selector: 'app-volume-agreement-drugs-details',
    templateUrl: './activity-volume-agreement-drugs-details.component.html',
    styleUrls: ['./activity-volume-agreement-drugs-details.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityVolumeAgreementDrugsDetailsComponent extends CommonInner implements OnInit {
    @Input()
    volumeAgreement: VolumeAgreement;

    drugInformation: DrugInformation;
    drugInformationGroup: any;

    @ViewChildren(AgreementDetailComponent) detailComponents: AgreementDetailComponent[];
    @ViewChildren(AgreementScaleComponent) scaleComponents: AgreementScaleComponent[];

    constructor(
        public dataService: DataService,
        public fb: FormBuilder
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit(this.volumeAgreement);

        this.selectedGroup(-1);

        this.buildForm({
            empty: []
        });
    }

    selected(drugInformation: any): void {
        this.drugInformation = drugInformation;

        if (!this.drugInformationGroup) {
            this.drugInformationGroup = this.volumeAgreement.drugInformationGroup.filter(item => item.name === drugInformation.groupName)[0];
        }
    }

    selectedGroup(drugInformationGroup: any): void {
        if (drugInformationGroup === -1) {
            const skus = [];
            this.volumeAgreement.drugInformationGroup.forEach((g: DrugInformationGroup) => {
                g.drugInformation.forEach((i: DrugInformation) => {
                    skus.push(i);
                });
            });
            this.drugInformationGroup = {
                drugInformation: skus,
                name: 'Все группы'
            };
            this.drugInformation = this.drugInformationGroup.drugInformation[0];
        } else {
            this.drugInformationGroup = drugInformationGroup;
        }
    }

    submit(): void {
    }

    setFillForm(item) {
        if (!item) {
            return;
        }

        const group = item.drugInformationGroup.find(g => g.name === this.drugInformation.groupName);
        const drug = group.drugInformation.find(i => i.skuId === this.drugInformation.skuId);
        const comp = this.detailComponents.find(c => c.drug.skuId === this.drugInformation.skuId);
        comp.form.patchValue(drug);
        const scalesComp = this.scaleComponents.find(c => c.drug.skuId === this.drugInformation.skuId);

        (scalesComp.form.get('scales') as FormArray).controls[0].get('planRubPrice').setValue(drug.scalesList[0].planRubPrice);
        (scalesComp.form.get('scales') as FormArray).controls[0].get('payRubPrice').setValue(drug.scalesList[0].payRubPrice);
        (scalesComp.form.get('scales') as FormArray).controls[1].get('planRubPrice').setValue(drug.scalesList[1].planRubPrice);
        (scalesComp.form.get('scales') as FormArray).controls[1].get('payRubPrice').setValue(drug.scalesList[1].payRubPrice);
        (scalesComp.form.get('scales') as FormArray).controls[2].get('planRubPrice').setValue(drug.scalesList[2].planRubPrice);
        (scalesComp.form.get('scales') as FormArray).controls[2].get('payRubPrice').setValue(drug.scalesList[2].payRubPrice);
    }
}
