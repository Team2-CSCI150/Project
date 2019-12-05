import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment, ENTRIES_URL} from '../../environments/environment';

import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
})
export class GradesPage implements OnInit {

	constructor(public alertCtrl: AlertController,
  				public navCtrl: NavController,
  				private router: Router,
  				public load: LoadingController,
  				private http: HttpClient
  				) {}

	classIDs = [];
	classKeys = [];
	displayClasses = [];
	studentID;

	ngOnInit() {
		//console.log("In Grades TS");
		this.studentID = sessionStorage.getItem("UserID");
		//console.log(this.studentID);
		this.classIDs = JSON.parse(sessionStorage.getItem('classes'));
		//console.log(this.classIDs);
		this.classKeys = Object.keys(this.classIDs);
		//console.log(this.classKeys);

		for(var i=0; i<this.classKeys.length; i++)
		{
			this.getEntries(this.studentID,this.classKeys[i],this.classIDs[this.classKeys[i]]);
		}
    }

    async presentGetEntriesError(error) {
      const alert = await this.alertCtrl.create({
        header: 'Failed To Get Entries',
        message: 'Cannot Get Error: ' + error,
        buttons: ['OK'],
      });
      await alert.present();
      let result=await alert.onDidDismiss();
      console.log(result);
    }

    getEntries(student,classIndx,classname)
    {
    	let res;
    	let data = JSON.stringify({
    		'studentID': student,
    		'classID': classIndx,
    		'showWhat': 'grades'
    	});
    	//console.log("Data: " + data);
    	this.http.post(ENTRIES_URL, data).subscribe(res=>{
        	if(res[0] == 'Get Grade Success!')
        	{
          		let temp = {
          			'title': classname,
          			'score': (Number.parseFloat(res[1])*100).toPrecision(3)
          		};
          		this.displayClasses.push(temp);
        	}
        	else
        	{
          	console.log(this.presentGetEntriesError(res[0]));
      		}
      	}, error => {
          	console.log(this.presentGetEntriesError(error));
        });
    }

    goTo(classname)
    {
    	var key;
    	for(var i=0; i<this.classKeys.length; i++)
    	{
    		if(this.classIDs[this.classKeys[i]] == classname)
    		{
    			key = this.classKeys[i];
    		}
    	}

    	let classEntry = {'name': classname, 'classid': key};
    	//console.log(classEntry);
    	sessionStorage.setItem('getClassEntries', JSON.stringify(classEntry));
    	this.router.navigate(['/grade-report']);
    }
}
