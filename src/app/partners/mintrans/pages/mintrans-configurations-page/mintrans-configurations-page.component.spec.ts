import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintransConfigurationsPageComponent } from './mintrans-configurations-page.component';

describe('MintransConfigurationsPageComponent', () => {
  let component: MintransConfigurationsPageComponent;
  let fixture: ComponentFixture<MintransConfigurationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintransConfigurationsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MintransConfigurationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
