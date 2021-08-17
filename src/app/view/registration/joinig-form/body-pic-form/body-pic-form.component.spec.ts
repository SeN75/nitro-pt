import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyPicFormComponent } from './body-pic-form.component';

describe('BodyPicFormComponent', () => {
  let component: BodyPicFormComponent;
  let fixture: ComponentFixture<BodyPicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyPicFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyPicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
