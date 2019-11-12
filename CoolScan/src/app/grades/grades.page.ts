import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
})
export class GradesPage implements OnInit {
	classes = [
		{
		title: 'Class 1',
		score: '100'
		},
		{
		title: 'Class 2',
		score: '80'
		}
	]
	constructor() { }
	ngOnInit() { }
  
	StudentID = 0;
	ClassName = " ";
	
	ViewCurrentGrade(StudentID, ClassName){
		//return grades for StudnetID from ClassID
	}

}
