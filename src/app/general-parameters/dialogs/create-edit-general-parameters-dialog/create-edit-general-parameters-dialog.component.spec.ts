import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditGeneralParametersDialogComponent } from './create-edit-general-parameters-dialog.component';

describe('CreateEditGeneralParametersDialogComponent', () => {
  let component: CreateEditGeneralParametersDialogComponent;
  let fixture: ComponentFixture<CreateEditGeneralParametersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditGeneralParametersDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditGeneralParametersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
