import {Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import {NotificationService} from '../notification.service';
import {Notification} from '../notification.model';
import {NotificationType} from '../notification-type.enum';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss']
}) 
export class NotificationMessageComponent implements OnInit{
  notifications: Notification[] = [];
  private _subscription: Subscription;

  constructor(private _notificationSvc: NotificationService) { }

  private _addNotification(notification: Notification) {
    this.notifications.push(notification);

    if (notification.timeout) {
      setTimeout(() => this.close(notification), notification.timeout);
    } else {
      setTimeout(() => this.close(notification), 0);
    }
  }

  ngOnInit() {
    this._subscription = this._notificationSvc.getObservable()
      .subscribe((notification: any) => {
        if (notification) {
          this._addNotification(notification)
        }
      });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  close(notification: Notification) {
    this.notifications = this.notifications.filter(notif => notif.id !== notification.id);
  }


  className(notification: Notification): string {
    let style: string = 'info';

    switch (notification.type) {

      case NotificationType.success:
        style = 'success';
        break;

      case NotificationType.warning:
        style = 'warning';
        break;

      case NotificationType.error:
        style = 'error';
        break;

      default:
        style = 'info';
        break;
    }

    return style;
  }
}
