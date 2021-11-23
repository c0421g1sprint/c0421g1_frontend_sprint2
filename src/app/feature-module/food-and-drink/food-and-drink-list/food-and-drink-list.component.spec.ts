import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodAndDrinkListComponent } from './food-and-drink-list.component';

describe('FoodAndDrinkListComponent', () => {
  let component: FoodAndDrinkListComponent;
  let fixture: ComponentFixture<FoodAndDrinkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodAndDrinkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodAndDrinkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
