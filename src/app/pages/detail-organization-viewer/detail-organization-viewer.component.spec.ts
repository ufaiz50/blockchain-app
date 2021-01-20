import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrganizationViewerComponent } from './detail-organization-viewer.component';

describe('DetailOrganizationViewerComponent', () => {
  let component: DetailOrganizationViewerComponent;
  let fixture: ComponentFixture<DetailOrganizationViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailOrganizationViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOrganizationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
