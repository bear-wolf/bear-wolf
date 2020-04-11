import {Component, Input, OnInit, SimpleChanges, ViewChildren, ViewEncapsulation} from '@angular/core';
import {Dma} from '../dma.model';
import {CommonInner} from '@shared/components/common-inner.component';
import {FormBuilder} from '@angular/forms';
import {DmaShowDataEnum} from '../activity-dma-stock-economics/dma-show-data.enum';
import {iOption} from '@shared/models/option.model';
import {enumToList} from '@shared/functions/enumToList';
import {DocumentComponent} from '@shared/components/document/document.component';

@Component({
    selector: 'app-activity-dma-total',
    templateUrl: './activity-dma-total.component.html',
    styleUrls: ['./activity-dma-total.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityDmaTotalComponent extends CommonInner implements OnInit {
    @Input() dma: Dma;
    showDataOptions: iOption[] = enumToList(DmaShowDataEnum);

    @ViewChildren(DocumentComponent) documentComponent: DocumentComponent;

    constructor(
        public fb: FormBuilder) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit(this.dma);
        this.loadDocument();

        this.buildForm({
            showData: [0],
            brand: [{disabled: true}],
            sku: [{disabled: true}],
            docNumber: [this.dma.activityDocument.docNumber],
            docDateFrom: [this.dma.activityDocument.docDateFrom],
            additionalAgreementNumber: [this.dma.activityDocument.additionalAgreementNumber],
            applicationNumber: [this.dma.activityDocument.applicationNumber],
            iDworkflow: [this.dma.activityDocument.iDworkflow]
        });

        this.form.get('brand').disable();
        this.form.get('sku').disable();

        this.form.get('showData').valueChanges.subscribe((value: number) => {
            switch (value) {
                case DmaShowDataEnum.BY_ALL:
                    this.form.get('brand').disable();
                    this.form.get('sku').disable();
                    break;
                case DmaShowDataEnum.BY_BRAND:
                    this.form.get('brand').enable();
                    this.form.get('sku').disable();
                    break;
                case DmaShowDataEnum.BY_SKU:
                    this.form.get('brand').disable();
                    this.form.get('sku').enable();
                    break;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        if (changes.dma) {
            this.dma = changes.dma.currentValue;
        }
    }

    submit() {
        this.form.markAllAsTouched();

        if (!this.form.valid || (!this.documentComponent.isValid())) {
            this.valid = false;
            return;
        }

        const formValue: any = this.form.getRawValue();
        this.dma.activityDocument.docNumber = formValue.docNumber;
        this.dma.activityDocument.docDateFrom = formValue.docDateFrom;
        this.dma.activityDocument.additionalAgreementNumber = formValue.additionalAgreementNumber;
        this.dma.activityDocument.applicationNumber = formValue.applicationNumber;
        this.dma.activityDocument.iDworkflow = formValue.iDworkflow;

        this.documentComponent.submit();
    }

}
