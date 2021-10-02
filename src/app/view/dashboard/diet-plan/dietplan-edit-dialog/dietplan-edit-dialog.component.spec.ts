import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietplanEditDialogComponent } from './dietplan-edit-dialog.component';

describe('DietplanEditDialogComponent', () => {
  let component: DietplanEditDialogComponent;
  let fixture: ComponentFixture<DietplanEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietplanEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietplanEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
