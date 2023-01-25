import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPingDialogComponent } from './new-ping-dialog.component';

describe('NewPingDialogComponent', () => {
  let component: NewPingDialogComponent;
  let fixture: ComponentFixture<NewPingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
