import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintransDashboardComponent } from './mintrans-dashboard.component';

describe('MintransDashboardComponent', () => {
  let component: MintransDashboardComponent;
  let fixture: ComponentFixture<MintransDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintransDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MintransDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
