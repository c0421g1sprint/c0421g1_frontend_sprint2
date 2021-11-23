import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodAndDrinkUpdateComponent } from './food-and-drink-update.component';

describe('FoodAndDrinkUpdateComponent', () => {
  let component: FoodAndDrinkUpdateComponent;
  let fixture: ComponentFixture<FoodAndDrinkUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodAndDrinkUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodAndDrinkUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
