import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTypeOfFeesDialogComponent } from './create-edit-type-of-fees-dialog.component';

describe('CreateEditTypeOfFeesDialogComponent', () => {
  let component: CreateEditTypeOfFeesDialogComponent;
  let fixture: ComponentFixture<CreateEditTypeOfFeesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditTypeOfFeesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditTypeOfFeesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
