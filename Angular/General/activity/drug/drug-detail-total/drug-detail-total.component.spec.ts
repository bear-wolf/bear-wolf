import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugDetailTotalComponent } from './drug-detail-total.component';

describe('DrugDetailTotalComponent', () => {
  let component: DrugDetailTotalComponent;
  let fixture: ComponentFixture<DrugDetailTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugDetailTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugDetailTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
