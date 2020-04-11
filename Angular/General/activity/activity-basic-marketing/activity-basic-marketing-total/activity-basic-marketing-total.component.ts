import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BasicMarketing} from '../basic-marketing.model';

@Component({
    selector: 'app-activity-basic-marketing-total',
    templateUrl: './activity-basic-marketing-total.component.html',
    styleUrls: ['./activity-basic-marketing-total.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityBasicMarketingTotalComponent extends CommonInner implements OnInit, OnChanges {
    @Input()
    basicMarketing: BasicMarketing;

    form: FormGroup;

    constructor(
        public fb: FormBuilder
    ) {
        super(fb);

        // default empty form
        this.buildForm({
            empty: []
        });
    }

    ngOnInit() {
        super.ngOnInit(this.basicMarketing);
        this.loadDocument();
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        if (changes.basicMarketing) {
            this.basicMarketing = changes.basicMarketing.currentValue;
        }
    }

    submit() {
        this.appDocument.forEach((childComponent: any) => {
            if (!this.basicMarketing.isActivityStatusDraft) {
                this.valid = childComponent.isValid();
                if (!this.valid) {
                    return;
                }
            }
            childComponent.submit();
        });
    }

}
