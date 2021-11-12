import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewImageOrVideoComponent } from './preview-image-or-video.component';

describe('PreviewImageOrVideoComponent', () => {
  let component: PreviewImageOrVideoComponent;
  let fixture: ComponentFixture<PreviewImageOrVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewImageOrVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewImageOrVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
