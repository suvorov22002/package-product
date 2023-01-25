import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangoteConfigurationsPageComponent } from './dangote-configurations-page.component';

describe('DangoteConfigurationsPageComponent', () => {
  let component: DangoteConfigurationsPageComponent;
  let fixture: ComponentFixture<DangoteConfigurationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangoteConfigurationsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangoteConfigurationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
