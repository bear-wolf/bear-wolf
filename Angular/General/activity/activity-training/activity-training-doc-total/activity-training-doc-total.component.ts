import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChildren, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import {Training} from '../training.model';
import {FormBuilder} from '@angular/forms';
import {DocumentType} from '@shared/components/document/document-type.model';
import {ActivatedRoute} from '@angular/router';
import {AgreementDetailComponent} from '@shared/components/agreement-drug/agreement-detail/agreement-detail.component';
import {DocumentComponent} from '@shared/components/document/document.component';

@Component({
    selector: 'app-activity-training-doc-total',
    templateUrl: './activity-training-doc-total.component.html',
    styleUrls: ['./activity-training-doc-total.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityTrainingDocTotalComponent extends CommonInner implements OnInit, OnChanges {
    @Input()
    training: Training;

    constructor(
        public fb: FormBuilder
    ) {
        super(fb);

        this.buildForm({
            empty: []
        });
    }

    ngOnInit() {
        super.ngOnInit(this.training);
        this.loadDocument();
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        if (changes.training) {
            this.training = changes.training.currentValue;
        }
    }

    submit() {
        this.appDocument.forEach((childComponent: any) => {
            if (!this.training.isActivityStatusDraft) {
                this.valid = childComponent.isValid();
                if (!this.valid) {
                    return;
                }
            }
            childComponent.submit();
        });
    }

}
