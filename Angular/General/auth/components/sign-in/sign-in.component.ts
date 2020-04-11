import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService, NotificationService, RequestService, StorageService} from '@shared/services';
import {Configuration} from "@shared/modules/outer-config/models/config";
import { SignIn } from '../../models';
import { Field, FieldTypeEnum, ValidationEnum } from '@shared/modules/form-fields/models/field';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  message: string = null;
  userForm: FormGroup;
  submitted = false;
  show = false;
  signInModel: SignIn;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private storageService: StorageService,
    private requestService: RequestService,
    private notificationService: NotificationService,
    private authService: AuthService) {

    this.signInModel = new SignIn();

    this.signInModel.email = new Field(true, [ValidationEnum.ISREQUIRED]).setPlaceHolder('Заполните поле');
    this.signInModel.password = new Field(true, [ValidationEnum.ISREQUIRED]).setPlaceHolder('Заполните поле').setType(FieldTypeEnum.PASSWORD);
  }

  ngOnInit() {
    this.clearView();
  }

  clearView() {
    this.message = null;
  }

  submitForm() {
    this.submitted = true;
    if (!this.signInModel.isValid()) {
      return;
    }
    let credentials = this.signInModel.value;
    this.authService.signIn(credentials)
      .subscribe(
        (data: string) => {
          data['token'] = this.authService.makeBearToken(data['token']);
          this.storageService
              .setToken(data['token'])
              .setAuth(JSON.stringify(data));

          setTimeout(() => {
            this.authService.getDefaultUser();
            this.router.navigate(['']);
          }, 100);
        },
        (error) => {
          this.notificationService.error('Ошибка', error.error.message)
        });
  }

  remindPassword() {
    //this.modalService.closeAll();
    // this.router.navigate(['']);
  }

}
