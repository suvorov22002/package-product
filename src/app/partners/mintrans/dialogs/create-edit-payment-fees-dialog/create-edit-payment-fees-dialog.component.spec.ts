import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPaymentFeesDialogComponent } from './create-edit-payment-fees-dialog.component';

describe('CreateEditPaymentFeesDialogComponent', () => {
  let component: CreateEditPaymentFeesDialogComponent;
  let fixture: ComponentFixture<CreateEditPaymentFeesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditPaymentFeesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditPaymentFeesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
