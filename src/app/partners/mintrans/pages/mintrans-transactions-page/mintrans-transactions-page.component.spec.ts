import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintransTransactionsPageComponent } from './mintrans-transactions-page.component';

describe('MintransTransactionsPageComponent', () => {
  let component: MintransTransactionsPageComponent;
  let fixture: ComponentFixture<MintransTransactionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintransTransactionsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MintransTransactionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
