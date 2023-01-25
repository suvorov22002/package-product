import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangoteDashboardComponent } from './dangote-dashboard.component';

describe('DangoteDashboardComponent', () => {
  let component: DangoteDashboardComponent;
  let fixture: ComponentFixture<DangoteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangoteDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangoteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
