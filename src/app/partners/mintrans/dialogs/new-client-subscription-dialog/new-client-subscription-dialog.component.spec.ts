import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClientSubscriptionDialogComponent } from './new-client-subscription-dialog.component';

describe('NewClientSubscriptionDialogComponent', () => {
  let component: NewClientSubscriptionDialogComponent;
  let fixture: ComponentFixture<NewClientSubscriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewClientSubscriptionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewClientSubscriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
