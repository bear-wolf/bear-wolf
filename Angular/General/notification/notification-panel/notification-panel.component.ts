import {Component, Input, OnInit} from '@angular/core';
import {NotificationService} from '@shared/modules/notification/notification.service';
import {AuthService} from "../../../../auth/services/auth.service";

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.scss']
})
export class NotificationPanelComponent implements OnInit{
  count: number;
  showNotification: boolean = false;

  constructor(
      private notificationService: NotificationService,
      public authService: AuthService) {

  }

  ngOnInit(): void {
    this.getNotificationCount();
  }

  getNotificationCount() {
    const user = this.authService.getUser();
    this.notificationService.getCount(user.id).subscribe((item)=>{
      this.count = item;
    });
  }

}
