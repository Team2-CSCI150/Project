import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeReportPage } from './grade-report.page';

describe('GradeReportPage', () => {
  let component: GradeReportPage;
  let fixture: ComponentFixture<GradeReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
