import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageInfoTableComponent } from './package-info-table.component';

describe('PackageInfoTableComponent', () => {
  let component: PackageInfoTableComponent;
  let fixture: ComponentFixture<PackageInfoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageInfoTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageInfoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
