import {Component, Input, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CommonInner} from '@shared/components/common-inner.component';
import {Comment} from '@shared/models/comment.model';
import {Configuration} from '@shared/modules/outer-config/models/config';
import {Activity} from '../../activity.model';
import {AuthService} from '../../../auth/services/auth.service';
import {User} from '@shared/models/user.model';
import * as moment from 'moment';

@Component({
  selector: 'app-activity-akam-agreement',
  templateUrl: './activity-akam-agreement.component.html',
  styleUrls: ['./activity-akam-agreement.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityAkamAgreementComponent extends CommonInner implements OnInit {
  @Input()
  activity: Activity;

  submitted: boolean = false;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    super(fb);
    console.log('ActivityAkamAgreementComponent');
  }

  ngOnInit() {
    super.ngOnInit(this.activity);

    this.buildForm({
      comment: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.model || !this.form) {
      return;
    }

    this.form.patchValue(changes.activity.currentValue);
  }

  get status(): string  {
    const value = AKAMStatusEnum[this.activity.isApproval ? AKAMStatusEnum.AkamStatusAgree : AKAMStatusEnum.AkamStatusDisAgree];

    return value;
  }

  get maxCount() {
    let value = this.form.get('comment').value || '';
    value = Configuration.comment.maxLength - value.length;

    return value;
  }

  save() {
    this.submitted = true;

    if (!this.form.valid) {
      return;
    }

    this.submitted = false;

    const user: User = this.authService.getSessionByStore().user;
    const comment = new Comment({
      message: this.form.get('comment').value,
      role: user.role.id,
      userId: user.id,
      date: moment().format(Configuration.format.serverDate),
      activityId: this.activity.id,
      activityVersion: this.activity.version
    });
    comment.setUser(user);

    this.activity.comments = this.activity.comments || [];
    this.activity.comments.push(comment);

    this.activity.addedComment = true;
    this.form.get('comment').setValue(null);
    this.submitted = false;
  }

  submit() {

  }

}


export enum AKAMStatusEnum {
  AkamStatusDisAgree,
  AkamStatusAgree,
}
