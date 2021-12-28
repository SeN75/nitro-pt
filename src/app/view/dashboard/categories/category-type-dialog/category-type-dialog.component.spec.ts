import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTypeDialogComponent } from './category-type-dialog.component';

describe('CategoryTypeDialogComponent', () => {
  let component: CategoryTypeDialogComponent;
  let fixture: ComponentFixture<CategoryTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
