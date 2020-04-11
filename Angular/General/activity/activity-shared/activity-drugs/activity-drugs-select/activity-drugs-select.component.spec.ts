import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDrugsSelectComponent } from './activity-drugs-select.component';

describe('ActivityDrugsSelectComponent', () => {
  let component: ActivityDrugsSelectComponent;
  let fixture: ComponentFixture<ActivityDrugsSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDrugsSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDrugsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
