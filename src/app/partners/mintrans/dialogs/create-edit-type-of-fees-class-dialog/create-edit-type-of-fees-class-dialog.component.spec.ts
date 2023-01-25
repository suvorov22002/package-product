import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTypeOfFeesClassDialogComponent } from './create-edit-type-of-fees-class-dialog.component';

describe('CreateEditTypeOfFeesClassDialogComponent', () => {
  let component: CreateEditTypeOfFeesClassDialogComponent;
  let fixture: ComponentFixture<CreateEditTypeOfFeesClassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditTypeOfFeesClassDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditTypeOfFeesClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
