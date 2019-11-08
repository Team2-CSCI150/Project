import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
})
export class GradesPage implements OnInit {
	constructor() { }
	ngOnInit() { }
  
	StudentID = 0;
	ClassName = " ";
	
	ViewCurrentGrade(StudentID, ClassName){
		//return grades for StudnetID from ClassID
	}

}