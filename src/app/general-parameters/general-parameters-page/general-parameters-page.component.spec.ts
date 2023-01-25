import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralParametersPageComponent } from './general-parameters-page.component';

describe('GeneralParametersPageComponent', () => {
  let component: GeneralParametersPageComponent;
  let fixture: ComponentFixture<GeneralParametersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralParametersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralParametersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
