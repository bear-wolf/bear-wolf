import { NgModule } from '@angular/core';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthRoutingModule } from './auth.routing';
import { SharedModule } from '@shared/shared.module';
import {CommonModule} from "@angular/common";
import { IdentityComponent } from './components/identity/identity.component';

@NgModule({
  declarations: [
    SignInComponent,
    IdentityComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
