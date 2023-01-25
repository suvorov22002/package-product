import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangoteListMarchandsComponent } from './dangote-list-marchands.component';

describe('DangoteListMarchandsComponent', () => {
  let component: DangoteListMarchandsComponent;
  let fixture: ComponentFixture<DangoteListMarchandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangoteListMarchandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangoteListMarchandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
