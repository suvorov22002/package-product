import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersDashboardPageComponent } from './partners-dashboard-page.component';

describe('PartnersDashboardPageComponent', () => {
  let component: PartnersDashboardPageComponent;
  let fixture: ComponentFixture<PartnersDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnersDashboardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnersDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
