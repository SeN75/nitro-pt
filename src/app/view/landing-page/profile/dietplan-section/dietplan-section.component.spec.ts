import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietplanSectionComponent } from './dietplan-section.component';

describe('DietplanSectionComponent', () => {
  let component: DietplanSectionComponent;
  let fixture: ComponentFixture<DietplanSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietplanSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietplanSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
