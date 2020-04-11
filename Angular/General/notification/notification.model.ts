import {NotificationType} from './notification-type.enum';
import {NotificationStatus} from './notification-status.enum';

export interface iNotification {
  id: number;
  type?: NotificationType;
  status?: NotificationStatus;
  title: string;
  message: string;
  timeout?: number;
  time: string;
}

export class Notification {
  id: number;
  type?: NotificationType;
  read?: NotificationStatus;
  title: string;
  message: string;
  timeout?: number;
  time: string;

  constructor(
      id: number,
      type?: NotificationType,
      title?: string,
      message?: string,
      timeout?: number,
  ) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.message = message;
    this.timeout = timeout || null;
  }

  // Deprecated
  set value(data: any) {
    this.setValue(data);
  }

  setValue(data: any) {
    this.id = data.id;
    this.type = data.type;
    this.title = data.title;
    this.message = data.message;
    this.timeout = data.timeout;
    this.time = data.time;
    this.read = data.read ? NotificationStatus.Read : NotificationStatus.New;

    return this;
  }

  get isStatusNew(): boolean {
    const value = this.read === NotificationStatus.New ? true : false;
    return value;
  }

  get isStatusRead(): boolean {
    const value = this.read === NotificationStatus.Read ? true : false;
    return value
  }

  setRead(){
    this.read = NotificationStatus.Read;

    return this;
  }
}
