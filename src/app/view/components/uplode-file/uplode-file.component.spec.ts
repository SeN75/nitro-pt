import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UplodeFileComponent } from './uplode-file.component';

describe('UplodeFileComponent', () => {
  let component: UplodeFileComponent;
  let fixture: ComponentFixture<UplodeFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UplodeFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UplodeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
