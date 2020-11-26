import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBlockViewerComponent } from './detail-block-viewer.component';

describe('DetailBlockViewerComponent', () => {
  let component: DetailBlockViewerComponent;
  let fixture: ComponentFixture<DetailBlockViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBlockViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBlockViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
