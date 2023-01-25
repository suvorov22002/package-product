import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartnerDialogComponent } from './edit-partner-dialog.component';

describe('EditPartnerDialogComponent', () => {
  let component: EditPartnerDialogComponent;
  let fixture: ComponentFixture<EditPartnerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPartnerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPartnerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
