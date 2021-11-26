import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFoodAndDrinkComponent } from './list-food-and-drink.component';

describe('ListFoodAndDrinkComponent', () => {
  let component: ListFoodAndDrinkComponent;
  let fixture: ComponentFixture<ListFoodAndDrinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFoodAndDrinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFoodAndDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
