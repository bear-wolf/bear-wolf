import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Activity } from '../../activity.model';
import { ActivityService } from '../../activity.service';

@Component({
  selector: 'app-marketing-plan-delete',
  templateUrl: './activity-delete.component.html',
  styleUrls: ['./activity-delete.component.scss']
})
export class ActivityDeleteComponent {
  activity: Activity;

  constructor(
    private activityService: ActivityService,
    public activeModal: NgbActiveModal
  ) { }

  delete(): void {
    this.activityService.delete(this.activity.id, this.activity.activityType).subscribe(() => {
      this.close(true);
    });
  }

  close(data?: any) {
    this.activeModal.close(data);
  }
}
