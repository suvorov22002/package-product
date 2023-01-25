import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfFeesClassConfigComponent } from './type-of-fees-class-config.component';

describe('TypeOfFeesClassConfigComponent', () => {
  let component: TypeOfFeesClassConfigComponent;
  let fixture: ComponentFixture<TypeOfFeesClassConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfFeesClassConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeOfFeesClassConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
