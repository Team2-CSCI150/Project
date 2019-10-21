import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxMessagePage } from './inbox-message.page';

describe('InboxMessagePage', () => {
  let component: InboxMessagePage;
  let fixture: ComponentFixture<InboxMessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxMessagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
