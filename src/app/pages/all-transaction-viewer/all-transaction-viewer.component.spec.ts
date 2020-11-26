import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTransactionViewerComponent } from './all-transaction-viewer.component';

describe('AllTransactionViewerComponent', () => {
  let component: AllTransactionViewerComponent;
  let fixture: ComponentFixture<AllTransactionViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTransactionViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTransactionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
