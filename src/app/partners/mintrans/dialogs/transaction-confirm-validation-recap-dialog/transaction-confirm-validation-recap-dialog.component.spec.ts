import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionConfirmValidationRecapDialogComponent } from './transaction-confirm-validation-recap-dialog.component';

describe('TransactionConfirmValidationRecapDialogComponent', () => {
  let component: TransactionConfirmValidationRecapDialogComponent;
  let fixture: ComponentFixture<TransactionConfirmValidationRecapDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionConfirmValidationRecapDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionConfirmValidationRecapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
