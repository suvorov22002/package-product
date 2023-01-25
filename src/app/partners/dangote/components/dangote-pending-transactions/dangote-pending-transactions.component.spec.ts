import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangotePendingTransactionsComponent } from './dangote-pending-transactions.component';

describe('DangotePendingTransactionsComponent', () => {
  let component: DangotePendingTransactionsComponent;
  let fixture: ComponentFixture<DangotePendingTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangotePendingTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangotePendingTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
