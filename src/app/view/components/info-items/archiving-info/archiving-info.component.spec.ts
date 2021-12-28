import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivingInfoComponent } from './archiving-info.component';

describe('ArchivingInfoComponent', () => {
  let component: ArchivingInfoComponent;
  let fixture: ComponentFixture<ArchivingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivingInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
