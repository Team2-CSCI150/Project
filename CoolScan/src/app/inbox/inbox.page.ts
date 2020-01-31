import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment, CLASSES_URL} from '../../environments/environment';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  classes = [];
  teacher = '';
  teacherID = '';
  ID = '';

  constructor(
	public alertCtrl: AlertController,
	public navCtrl: NavController,
    private router: Router,
    public load: LoadingController,
    private http: HttpClient ) { }

	ngOnInit() {
		this.ID= sessionStorage.getItem('UserID');
		//console.log (this.ID);
		this.getClasses(this.ID);
	}

	getClasses(ID){
		let res;
		let data = JSON.stringify({'studentID': ID});

		this.http.post(CLASSES_URL, data).subscribe(res=> {
			if(res[0] == 'Get Classes Succes!'){
				//console.log("This is res[1]: ");
				console.log(res[1]);

				var Class = JSON.parse(JSON.stringify(res[1]));
				console.log(Class);
				var courses = [Class["510100"], Class["510102"],
						Class["510103"], Class["510104"]];
				this.classes.push(courses);
				console.log(courses);
			}
			else{
				console.log("Failed getting classes! ");
			}
		});
	}

  setTeacher(teacher, teacherid){
	  sessionStorage.setItem('Teacher', this.teacher);
	  sessionStorage.setItem('TeacherID', this.teacherID);
	  this.router.navigateByUrl('/convo');
  }
}
