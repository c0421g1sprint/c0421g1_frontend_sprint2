import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSkillMyselfComponent } from './test-skill-myself.component';

describe('TestSkillMyselfComponent', () => {
  let component: TestSkillMyselfComponent;
  let fixture: ComponentFixture<TestSkillMyselfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSkillMyselfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSkillMyselfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
