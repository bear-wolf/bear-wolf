import {Component, Input, OnInit, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import {FormBuilder} from '@angular/forms';
import {VolumeAgreement} from '../volume-agreement.model';
import {AgreementTotal} from '../../activity-shared/agreement-total.model';
import {DocumentComponent} from '@shared/components/document/document.component';
import {VolumeAgreementGroup} from '../volume-agreement-group';

@Component({
    selector: 'app-volume-agreement-docs',
    templateUrl: './activity-volume-agreement-docs.component.html',
    styleUrls: ['./activity-volume-agreement-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityVolumeAgreementDocsComponent extends CommonInner implements OnInit {
    @Input()
    volumeAgreement: VolumeAgreement;

    total: AgreementTotal;

    private _bonusAmount: number = 0;
    private bonusAmountPercent: number = 0;

    get bonusAmount() {
        return this._bonusAmount;
    }

    constructor(
        public fb: FormBuilder
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit(this.volumeAgreement);
        this.loadDocument();
        this.calculateTotal();
    }

    private calculateTotal() {
        this.total = new AgreementTotal({
            directPosting: this.volumeAgreement.directPosting,
            revers: this.volumeAgreement.revers
        }, this.volumeAgreement.drugInformationGroup.filter(group => group.drugInformation));

        this.total.directPosting = this.total.scale1 + this.total.scale2 + this.total.scale3;
        this.total.calcRevers();

        this.bonusAmountPercent = this.volumeAgreement.premiumSize;
        this.calcBonusAmount();
        this.buildForm({
            premiumSize: [this.volumeAgreement.premiumSize]
        });

        this.form.valueChanges.subscribe((item) => {
            this.bonusAmountPercent = Number(item.premiumSize || 0);
            this.volumeAgreement.premiumSize = Number(item.premiumSize || 0);
            this.calcBonusAmount();
        });
    }

    submit() {
        this.appDocument.forEach((childComponent: any) => {
            if (!this.volumeAgreement.isActivityStatusDraft) {
                this.valid = childComponent.isValid();
                if (!this.valid) {
                    return;
                }
            }
            childComponent.submit();
        });
    }

    calcBonusAmount() {
        let sumPayRubPrice = 0;

        (this.volumeAgreement.drugInformationGroup || []).forEach((group) => {
            (group.drugInformation || []).forEach((drug) => {
                sumPayRubPrice += drug.scalesList[drug.currentScale].payRubPrice;
            });
        });

        this._bonusAmount = this.bonusAmountPercent * sumPayRubPrice;
    }
}
