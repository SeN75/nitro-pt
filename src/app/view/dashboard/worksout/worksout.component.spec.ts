import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksoutComponent } from './worksout.component';

describe('WorksoutComponent', () => {
  let component: WorksoutComponent;
  let fixture: ComponentFixture<WorksoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
