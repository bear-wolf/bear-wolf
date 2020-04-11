import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFinesComponent } from './activity-fines.component';

describe('ActivityFinesComponent', () => {
  let component: ActivityFinesComponent;
  let fixture: ComponentFixture<ActivityFinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityFinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityFinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
