import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodAndDrinkCreateComponent } from './food-and-drink-create.component';

describe('FoodAndDrinkCreateComponent', () => {
  let component: FoodAndDrinkCreateComponent;
  let fixture: ComponentFixture<FoodAndDrinkCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodAndDrinkCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodAndDrinkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
