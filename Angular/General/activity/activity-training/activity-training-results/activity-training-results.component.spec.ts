import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTrainingResultsComponent } from './activity-training-results.component';

describe('ActivityTrainingResultsComponent', () => {
  let component: ActivityTrainingResultsComponent;
  let fixture: ComponentFixture<ActivityTrainingResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTrainingResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTrainingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
