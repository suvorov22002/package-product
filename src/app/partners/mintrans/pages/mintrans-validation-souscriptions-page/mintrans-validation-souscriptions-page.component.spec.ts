import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintransValidationSouscriptionsPageComponent } from './mintrans-validation-souscriptions-page.component';

describe('MintransValidationSouscriptionsPageComponent', () => {
  let component: MintransValidationSouscriptionsPageComponent;
  let fixture: ComponentFixture<MintransValidationSouscriptionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintransValidationSouscriptionsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MintransValidationSouscriptionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
