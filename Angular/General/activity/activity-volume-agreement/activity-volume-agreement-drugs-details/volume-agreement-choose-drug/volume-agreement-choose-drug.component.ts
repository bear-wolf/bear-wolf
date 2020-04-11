import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {VolumeAgreement} from '../../volume-agreement.model';
import {DrugInformationGroup} from '../../../activity-shared/drug-information-group.model';
import {DrugInformation} from '../../drug-information.model';
import {VolumeAgreementGroup} from '../../volume-agreement-group';

@Component({
  selector: 'app-volume-agreement-choose-drug',
  templateUrl: './volume-agreement-choose-drug.component.html',
  styleUrls: ['./volume-agreement-choose-drug.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VolumeAgreementChooseDrugComponent extends CommonInner implements OnInit {
  @Input()
  volumeAgreement: VolumeAgreement;

  @Output()
  selected: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  selectedGroup: EventEmitter<DrugInformationGroup> = new EventEmitter<DrugInformationGroup>();

  form: FormGroup;
  listGroup: VolumeAgreementGroup[];

  constructor(
    public fb: FormBuilder,
  ) {
    super(fb);
  }

  ngOnInit() {
    this.listGroup = this.convertDrugInformationGroupToiOption(this.volumeAgreement.drugInformationGroup);
    this.form = this.buildForm({
      group: [this.volumeAgreement.drugInformationGroup[0]]
    });

    this.selectGroup();

    this.form.get('group').valueChanges.subscribe(() => {
      this.selectGroup();
    });
  }

  convertDrugInformationGroupToiOption(data: VolumeAgreementGroup[]) {
    const options: any[] = [];
    data.forEach((item: VolumeAgreementGroup) => {
      options.push({
        value: item,
        label: item.name
      });
    });

    return options;
  }

  selectGroup(): void {
    this.selectedGroup.emit(this.form.get('group').value);
    this.selectedItem(this.form.get('group').value.drugInformation[0]);
  }

  selectedItem(item: DrugInformation): void {
    this.selected.emit(item);
  }
}
