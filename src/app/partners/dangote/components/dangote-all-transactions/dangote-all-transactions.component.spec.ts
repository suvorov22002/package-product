import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangoteAllTransactionsComponent } from './dangote-all-transactions.component';

describe('DangoteAllTransactionsComponent', () => {
  let component: DangoteAllTransactionsComponent;
  let fixture: ComponentFixture<DangoteAllTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangoteAllTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangoteAllTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
