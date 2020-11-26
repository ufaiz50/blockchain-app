import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBlockViewerComponent } from './all-block-viewer.component';

describe('AllBlockViewerComponent', () => {
  let component: AllBlockViewerComponent;
  let fixture: ComponentFixture<AllBlockViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBlockViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBlockViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
