import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import {FormBuilder} from '@angular/forms';
import {JointAgreement} from '../joint-agreement.model';
import {DocumentComponent} from '@shared/components/document/document.component';

@Component({
    selector: 'app-activity-joint-agreement-docs',
    templateUrl: './activity-joint-agreement-docs.component.html',
    styleUrls: ['./activity-joint-agreement-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityJointAgreementDocsComponent extends CommonInner implements OnInit, OnChanges {
    @Input()
    jointAgreement: JointAgreement;

    // @ViewChild(DocumentComponent)
    // documentComponent : DocumentComponent;

    constructor(
        public fb: FormBuilder
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit(this.jointAgreement);
        this.loadDocument();
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        if (changes.jointAgreement) {
            this.jointAgreement = changes.jointAgreement.currentValue;
        }
    }

    submit() {
        this.appDocument.forEach((childComponent: any) => {
            if (!this.jointAgreement.isActivityStatusDraft) {
                this.valid = childComponent.isValid();
                if (!this.valid) {
                    return;
                }
            }
            childComponent.submit();
        });
    }
}
