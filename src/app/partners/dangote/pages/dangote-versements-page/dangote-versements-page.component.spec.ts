import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangoteVersementsPageComponent } from './dangote-versements-page.component';

describe('DangoteVersementsPageComponent', () => {
  let component: DangoteVersementsPageComponent;
  let fixture: ComponentFixture<DangoteVersementsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangoteVersementsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangoteVersementsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
