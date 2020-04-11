import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChildren, ViewEncapsulation} from '@angular/core';
import {BonusAgreement} from '../bonus-agreement.model';
import {CommonInner} from '@shared/components/common-inner.component';
import {FormBuilder} from '@angular/forms';
import {AgreementTotal} from '../../activity-shared/agreement-total.model';
import {ActivityStatusEnum} from '../../activity-status.enum';
import {Configuration} from '@shared/modules/outer-config/models/config';
import {DocumentComponent} from '@shared/components/document/document.component';

@Component({
    selector: 'app-activity-bonus-agreement-docs-and-results',
    templateUrl: './activity-bonus-agreement-docs-and-results.component.html',
    styleUrls: ['./activity-bonus-agreement-docs-and-results.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityBonusAgreementDocsAndResultsComponent extends CommonInner implements OnInit, OnChanges {
    @Input()
    bonusAgreement: BonusAgreement;

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
        super.ngOnInit(this.bonusAgreement);
        this.loadDocument();
        this.calculateTotal();
    }

    private calculateTotal() {
        this.total = new AgreementTotal({
            directPosting: this.bonusAgreement.directPosting,
            revers: this.bonusAgreement.revers
        }, this.bonusAgreement.drugInformationGroup.map(group => group.drugInformation));

        if (this.bonusAgreement.activityStatus !== (ActivityStatusEnum.PAID || ActivityStatusEnum.SUBMITTED_TO_DIRECT_POSTING)) {
            this.total.directPosting = this.bonusAgreement.estimatedInvestmentsForPeriodPrice;
        }
        if (this.bonusAgreement.activityStatus === ActivityStatusEnum.SUBMITTED_TO_DIRECT_POSTING) {
            this.total.directPosting = this.bonusAgreement.factTotal - (this.bonusAgreement.factTotal * Configuration.ndsPercent);
        }

        this.calcBonusAmount();
        this.buildForm({
            premiumSize: [this.bonusAgreement.premiumSize]
        });

        this.form.valueChanges.subscribe((item) => {
            this.bonusAmountPercent = Number(item.premiumSize || 0);
            this.bonusAgreement.premiumSize = Number(item.premiumSize || 0);
            this.calcBonusAmount();
        });
    }

    calcBonusAmount() {
        let sumPayRubPrice = 0;

        (this.bonusAgreement.drugInformationGroup || []).forEach((group) => {
            (group.drugInformation || []).forEach((drug) => {
                sumPayRubPrice += drug.scalesList[drug.currentScale].payRubPrice;
            });
        });

        this._bonusAmount = this.bonusAmountPercent * sumPayRubPrice;
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        if (changes.bonusAgreement) {
            this.bonusAgreement = changes.bonusAgreement.currentValue;
        }
    }

    submit() {
        this.appDocument.forEach((childComponent: any) => {
            if (!this.bonusAgreement.isActivityStatusDraft) {
                this.valid = childComponent.isValid();
                if (!this.valid) {
                    return;
                }
            }
            childComponent.submit();
        });
    }
}
