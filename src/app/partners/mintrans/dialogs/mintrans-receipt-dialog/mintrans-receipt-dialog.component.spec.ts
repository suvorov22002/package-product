import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintransReceiptDialogComponent } from './mintrans-receipt-dialog.component';

describe('MintransReceiptDialogComponent', () => {
  let component: MintransReceiptDialogComponent;
  let fixture: ComponentFixture<MintransReceiptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintransReceiptDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MintransReceiptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
