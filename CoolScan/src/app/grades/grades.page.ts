import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
	constructor(public alertCtrl: AlertController, 
  				public navCtrl: NavController,
  				private router: Router, 
  				public load: LoadingController,
  				private http: HttpClient	
  				) { }
  				
	ngOnInit() { }

  
	StudentID = 0;
	ClassName = " ";
	
	ViewCurrentGrade(StudentID, ClassName){
		//return grades for StudnetID from ClassID
	}


}
