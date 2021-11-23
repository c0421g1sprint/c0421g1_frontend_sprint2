import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeStatisticsComponent } from './income-statistics.component';

describe('IncomeStatisticsComponent', () => {
  let component: IncomeStatisticsComponent;
  let fixture: ComponentFixture<IncomeStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
