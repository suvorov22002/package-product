import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangoteReceiptViewerDialogComponent } from './dangote-receipt-viewer-dialog.component';

describe('DangoteReceiptViewerDialogComponent', () => {
  let component: DangoteReceiptViewerDialogComponent;
  let fixture: ComponentFixture<DangoteReceiptViewerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangoteReceiptViewerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangoteReceiptViewerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
