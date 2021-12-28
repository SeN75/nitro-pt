import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyPicInfoComponent } from './body-pic-info.component';

describe('BodyPicInfoComponent', () => {
  let component: BodyPicInfoComponent;
  let fixture: ComponentFixture<BodyPicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyPicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyPicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
