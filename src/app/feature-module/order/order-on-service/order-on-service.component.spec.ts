import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOnServiceComponent } from './order-on-service.component';

describe('OrderOnServiceComponent', () => {
  let component: OrderOnServiceComponent;
  let fixture: ComponentFixture<OrderOnServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderOnServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOnServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
