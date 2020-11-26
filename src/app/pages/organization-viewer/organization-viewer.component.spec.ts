import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationViewerComponent } from './organization-viewer.component';

describe('OrganizationViewerComponent', () => {
  let component: OrganizationViewerComponent;
  let fixture: ComponentFixture<OrganizationViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
