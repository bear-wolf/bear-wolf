import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationMessageComponent } from '@shared/modules/notification/notification-message/notification-message.component';
import { NotificationPanelComponent } from '@shared/modules/notification/notification-panel/notification-panel.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NotificationMessageComponent,
    NotificationPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NotificationMessageComponent,
    NotificationPanelComponent
  ]
})
export class NotificationModule { }
