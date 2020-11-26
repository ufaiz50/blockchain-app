import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTransactionViewerComponent } from './detail-transaction-viewer.component';

describe('DetailTransactionViewerComponent', () => {
  let component: DetailTransactionViewerComponent;
  let fixture: ComponentFixture<DetailTransactionViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTransactionViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTransactionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
