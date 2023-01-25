import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangoteMyTransactionsComponent } from './dangote-my-transactions.component';

describe('DangoteMyTransactionsComponent', () => {
  let component: DangoteMyTransactionsComponent;
  let fixture: ComponentFixture<DangoteMyTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangoteMyTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangoteMyTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
