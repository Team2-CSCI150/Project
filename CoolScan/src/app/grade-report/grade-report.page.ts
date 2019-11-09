import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grade-report',
  templateUrl: './grade-report.page.html',
  styleUrls: ['./grade-report.page.scss'],
})
export class GradeReportPage implements OnInit {
  assignments = [
    {
    name: 'Homework 1',
    currentscore: '85',
    maxscore: '100'
    },
    {
    name: 'Homework 2',
    currentscore: '98',
    maxscore: '100'
    },
    {
    name: 'Homework 3',
    currentscore: '90',
    maxscore: '100'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
