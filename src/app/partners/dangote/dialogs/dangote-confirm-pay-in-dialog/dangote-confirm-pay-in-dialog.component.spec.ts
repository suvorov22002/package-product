import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangoteConfirmPayInDialogComponent } from './dangote-confirm-pay-in-dialog.component';

describe('DangoteConfirmPayInDialogComponent', () => {
  let component: DangoteConfirmPayInDialogComponent;
  let fixture: ComponentFixture<DangoteConfirmPayInDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangoteConfirmPayInDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangoteConfirmPayInDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
