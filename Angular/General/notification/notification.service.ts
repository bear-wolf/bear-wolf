import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Notification } from './notification.model';
import { Configuration } from '@shared/modules/outer-config/models/config';
import {HttpClient} from '@angular/common/http';
import {NotificationType} from './notification-type.enum';
import {Session, User} from '../../../auth/models';
import {map} from "rxjs/operators";
import {ListUser} from '../../../user/components/user-list/list-user.model';
import {iPagination} from '@shared/models/pagination.model';
import {ListNotification} from '../../../notification/notification-list/list-notification.model';

@Injectable()
export class NotificationService {
  private _subject = new BehaviorSubject<Notification>(null);
  private _idx = 0;

  private timeOut = Configuration.notificationTimeOut;

  constructor(
      private http: HttpClient
  ) {
  }

  getCount(userId: number): Observable<number> {
    return this.http.get<number>(`Notification/Count?userId=${userId}`);
  }

  getAll(userId: number): Observable<Notification[]>{
    return this.http.get<Notification[]>(`Notification/GetAll?userId=${userId}`);
  }

  getAllForPage(userId: number, page: number, pageSize: number): Observable<ListNotification> {
    return this.http.get(`Notification/GetAllForPage?userId=${userId}&page=${page}&pageSize=${pageSize}`)
        .pipe(
            map((response: iPagination) => {
              const list: Notification[] = [];

              response.itemsPerPage.forEach((item: any) => {
                const notification = new Notification(item)
                notification.value = item;
                list.push(notification);
              });

              return new ListNotification(list, response.pageInfo);
            })
        );
  }

  getByID(id: number): Observable<Notification>{
    return this.http.get<Notification>(`Notification/${id}`);
  }

  setRead(id: number): Observable<Notification>{
    return this.http.put<Notification>(`Notification/Read?id=${id}`, {});
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`Notification/${id}`);
  }

  getObservable(): Observable<Notification> {
    return this._subject.asObservable();
  }

  info(title: string, message: string, timeout = 0) {
    timeout = timeout || this.timeOut;
    this._subject.next(new Notification(this._idx++, NotificationType.info, title, message, timeout));
  }

  success(title: string, message: string, timeout = 0) {
    timeout = timeout || this.timeOut;
    this._subject.next(new Notification(this._idx++, NotificationType.success, title, message, timeout));
  }

  warning(title: string, message: string, timeout = 0) {
    timeout = timeout || this.timeOut;
    this._subject.next(new Notification(this._idx++, NotificationType.warning, title, message, timeout));
  }

  error(title: string, message: string, timeout = 0) {
    timeout = timeout || this.timeOut;
    this._subject.next(new Notification(this._idx++, NotificationType.error, title, message, timeout));
  }

}
