import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsHealthSuberInfoComponent } from './sports-health-suber-info.component';

describe('SportsHealthSuberInfoComponent', () => {
  let component: SportsHealthSuberInfoComponent;
  let fixture: ComponentFixture<SportsHealthSuberInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportsHealthSuberInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsHealthSuberInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
