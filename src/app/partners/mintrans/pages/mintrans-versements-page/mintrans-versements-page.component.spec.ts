import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintransVersementsPageComponent } from './mintrans-versements-page.component';

describe('MintransVersementsPageComponent', () => {
  let component: MintransVersementsPageComponent;
  let fixture: ComponentFixture<MintransVersementsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintransVersementsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MintransVersementsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
