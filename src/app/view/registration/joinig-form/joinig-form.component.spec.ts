import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinigFormComponent } from './joinig-form.component';

describe('JoinigFormComponent', () => {
  let component: JoinigFormComponent;
  let fixture: ComponentFixture<JoinigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinigFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
