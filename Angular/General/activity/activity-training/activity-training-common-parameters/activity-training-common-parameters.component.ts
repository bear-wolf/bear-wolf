import {Component, Input, NgZone, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import {FormBuilder, Validators} from '@angular/forms';
import {DynamicForm, DynamicFormTemplate} from '@shared/components/dynamic-form/dynamic-form.model';
import {DynamicFormEnum} from '@shared/components/dynamic-form/dynamic-form.enum';
import {Training} from '../training.model';
import {iOption} from '@shared/models/option.model';
import {enumToList} from '@shared/functions/enumToList';
import {Activity} from '../../activity.model';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-activity-training-common-parameters',
    templateUrl: './activity-training-common-parameters.component.html',
    styleUrls: ['./activity-training-common-parameters.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityTrainingCommonParametersComponent extends CommonInner implements OnInit {
    @Input()
    training: Training;

    trainingForm: iOption[] = enumToList(TrainingForm);
    trainingType: iOption[] = enumToList(TrainingType);
    conductsTraining: iOption[] = enumToList(ConductsTraining);

    constructor(
        public fb: FormBuilder
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit(this.training);

        this.buildForm({
            trainingForm: [this.training.trainingForm, Validators.required],
            trainingType: [this.training.trainingType],
            conductsTraining: [this.training.conductsTraining],
            dayDuration: [this.training.dayDuration],
            salesDuringTrainingPrice: [this.training.salesDuringTrainingPrice]
        });
    }

    submit() {
        this.form.markAllAsTouched();
        if (!this.validation()) {
            return;
        }

        const data = this.form.getRawValue();

        this.training.trainingForm = Number(data.trainingForm || 0);
        this.training.trainingType = Number(data.trainingType || 0);
        this.training.conductsTraining = Number(data.conductsTraining || 0);
        this.training.dayDuration = Number(data.dayDuration || 0);
        this.training.salesDuringTrainingPrice = Number(data.salesDuringTrainingPrice || 0);
    }
}

enum TrainingForm {
    TrainingFormRemote,
    TrainingFormTesting,
    TrainingFormOtherMethods
}

enum TrainingType {
    TrainingTypeOnlineSeminar,
    TrainingTypeTesting
}

enum ConductsTraining {
    ConductsTrainingEmployee,
    ConductsTrainingOtherPerson
}
