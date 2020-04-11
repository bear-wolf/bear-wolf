import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {VolumeAgreement} from '../volume-agreement.model';
import {CommonInner} from '@shared/components/common-inner.component';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Sku} from '@shared/models/sku.model';
import {SkuService} from '@shared/services/sku.service';
import {DrugInformationGroup} from '../../activity-shared/drug-information-group.model';
import {DrugInformation} from '../drug-information.model';
import {CurrencyService} from '@shared/components/currency/currency.service';
import {VolumeAgreementGroup} from '../volume-agreement-group';
import {BonusAgreementGroup} from '../../activity-bonus-agreement/bonus-agreement-group';
import {debug} from 'util';
import {group} from '@angular/animations';

@Component({
    selector: 'app-volume-agreement-drugs-group',
    templateUrl: './activity-volume-agreement-drugs-group.component.html',
    styleUrls: ['./activity-volume-agreement-drugs-group.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityVolumeAgreementDrugsGroupComponent extends CommonInner implements OnInit {
    @Input()
    volumeAgreement: VolumeAgreement;
    filteredSkuList: Sku[] = [];

    constructor(
        public fb: FormBuilder,
        public skuService: SkuService,
        public currencyService: CurrencyService
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit(this.volumeAgreement);
        // TODO: set Validators.required
        this.buildForm({
            skuList: this.fb.array([])
        });
        this.volumeAgreement.drugInformationGroup.forEach((group: VolumeAgreementGroup, index: number) => {
            (this.form.get('skuList') as FormArray).push(
                this.fb.group({
                    name: [group.name || `Группа ${index + 1}`, Validators.required],
                    drugInformation: [this.getDrugInfoGroupSkus(group.drugInformation)],
                    personalAccountingSku: [group.personalAccountingSku]
                })
            );
        });

        if (!this.volumeAgreement.drugInformationGroup.length) {
            this.onPlus();
        }
    }

    getDrugInfoGroupSkus(drugInformations: DrugInformation[]): Sku[] {
        const skus: Sku[] = [];

        drugInformations.forEach((drugInfo: DrugInformation) => {
            this.skuService.getById(drugInfo.skuId).subscribe((sku: Sku) => {
                skus.push(sku);
            });
        });

        return skus;
    }


    onPlus() {
        (this.form.get('skuList') as FormArray).push(
            this.fb.group({
                name: [`Группа ${(this.form.get('skuList') as FormArray).controls.length + 1}`],
                drugInformation: [[]],
                personalAccountingSku: [false]
            })
        );
    }

    onMinus(index: number) {
        const controls: FormArray = (this.form.get('skuList') as FormArray);
        if (controls.length <= 1) {
            return;
        }

        controls.removeAt(index);
    }

    searchSku(event) {
        this.skuService.getSkuByName(event.query).subscribe((skuList: Sku[]) => {
            this.filteredSkuList = skuList;
        });
    }


    submit() {
        this.form.markAllAsTouched();
        const formValue: any = this.form.getRawValue();

        const groups: any[] = [];
        formValue.skuList.forEach((drugInformationGroup: any) => {
            const existingDrugInfoGroup: VolumeAgreementGroup = this.volumeAgreement.drugInformationGroup.find((g: VolumeAgreementGroup) => g.name === drugInformationGroup.name);

            if (existingDrugInfoGroup) {
                drugInformationGroup.drugInformation.forEach((drugInfo: any) => {
                    const existingDrugInfo: DrugInformation = existingDrugInfoGroup.drugInformation.find((i: DrugInformation) => i.sku.id === drugInfo.id);

                    if (!existingDrugInfo) {
                        existingDrugInfoGroup.drugInformation.push(new DrugInformation(this.currencyService, {
                            skuId: drugInfo.id,
                            sku: drugInfo,
                            groupName: existingDrugInfoGroup.name
                        }));
                    }
                });

                existingDrugInfoGroup.drugInformation.map((i: DrugInformation) => i.groupName = existingDrugInfoGroup.name);
                groups.push(existingDrugInfoGroup);
            } else {
                const drugInfoGroup: VolumeAgreementGroup = new VolumeAgreementGroup(
                    this.currencyService, {
                        volumeAgreementId: this.volumeAgreement.id,
                        volumeAgreementVersion: this.volumeAgreement.version,
                        name: drugInformationGroup.name,
                        drugInformation: [],
                        personalAccountingSku: drugInformationGroup.personalAccountingSku
                    });

                drugInformationGroup.drugInformation.forEach((drugInfo: any) => {
                    drugInfoGroup.drugInformation.push(new DrugInformation(this.currencyService, {
                        skuId: drugInfo.id,
                        sku: drugInfo,
                        groupName: drugInformationGroup.name
                    }));
                });

                if (drugInfoGroup.drugInformation.length) {
                    groups.push(drugInfoGroup);
                }
            }
        });
        this.volumeAgreement.drugInformationGroup = groups;
        console.log('group', groups.length);
    }
}
