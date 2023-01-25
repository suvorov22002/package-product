import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfFeesConfigComponent } from './type-of-fees-config.component';

describe('TypeOfFeesConfigComponent', () => {
  let component: TypeOfFeesConfigComponent;
  let fixture: ComponentFixture<TypeOfFeesConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfFeesConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeOfFeesConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
