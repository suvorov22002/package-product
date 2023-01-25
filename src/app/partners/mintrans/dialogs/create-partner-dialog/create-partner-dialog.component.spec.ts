import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePartnerDialogComponent } from './create-partner-dialog.component';

describe('CreatePartnerDialogComponent', () => {
  let component: CreatePartnerDialogComponent;
  let fixture: ComponentFixture<CreatePartnerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePartnerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePartnerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
