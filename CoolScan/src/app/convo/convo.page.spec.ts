import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvoPage } from './convo.page';

describe('ConvoPage', () => {
  let component: ConvoPage;
  let fixture: ComponentFixture<ConvoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
