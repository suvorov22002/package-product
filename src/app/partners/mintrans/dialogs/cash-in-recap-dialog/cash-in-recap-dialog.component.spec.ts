import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashInRecapDialogComponent } from './cash-in-recap-dialog.component';

describe('CashInRecapDialogComponent', () => {
  let component: CashInRecapDialogComponent;
  let fixture: ComponentFixture<CashInRecapDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashInRecapDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashInRecapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
