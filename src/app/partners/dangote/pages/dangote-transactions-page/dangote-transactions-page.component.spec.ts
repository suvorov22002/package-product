import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangoteTransactionsPageComponent } from './dangote-transactions-page.component';

describe('DangoteTransactionsPageComponent', () => {
  let component: DangoteTransactionsPageComponent;
  let fixture: ComponentFixture<DangoteTransactionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangoteTransactionsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangoteTransactionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
