import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackInfoComponent } from './back-info.component';

describe('BackInfoComponent', () => {
  let component: BackInfoComponent;
  let fixture: ComponentFixture<BackInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
