import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugDetailFullComponent } from './drug-detail-full.component';

describe('DrugDetailFullComponent', () => {
  let component: DrugDetailFullComponent;
  let fixture: ComponentFixture<DrugDetailFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugDetailFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugDetailFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
