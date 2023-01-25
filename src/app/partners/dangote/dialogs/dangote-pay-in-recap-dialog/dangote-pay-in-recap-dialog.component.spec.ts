import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangotePayInRecapDialogComponent } from './dangote-pay-in-recap-dialog.component';

describe('DangotePayInRecapDialogComponent', () => {
  let component: DangotePayInRecapDialogComponent;
  let fixture: ComponentFixture<DangotePayInRecapDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangotePayInRecapDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangotePayInRecapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
