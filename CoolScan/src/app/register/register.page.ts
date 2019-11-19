import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment, REGISTER_URL} from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

	userData = {"fname": "", "lname": "", "uid": "", "upw": ""};

  constructor(public alertCtrl: AlertController,
				private router: Router,
				public http: HttpClient) {
  }

  ngOnInit() {
  }

  	//Constructor Alert for success and fails
  	async presentSuccessAlert(success) {
		const alert = await this.alertCtrl.create({
			header: 'Register Success',
			message: 'Congrats, you are successfully registered: ' + success,
			buttons: ['OK'],
		});

		await alert.present();
		let result=await alert.onDidDismiss();
		console.log(result);
	}

	async presentFailAlert(error) {
		const alert = await this.alertCtrl.create({
			header: 'Register Failed',
			message: 'Registration Error: ' + error,
			buttons: ['OK'],
		});

		await alert.present();
		let result=await alert.onDidDismiss();
		console.log(result);
	}


	register() {
		let res;
		//Convert to Json string to send to php file
		let data = JSON.stringify({
			fname: this.userData.fname,
			lname: this.userData.lname,
			uid: this.userData.uid,
			upw: this.userData.upw
		});
		//Post to php file and return success or fail
		this.http.post(REGISTER_URL, data).subscribe(res=>{
			console.log(res);
			if(res == 'Register Success')
			{
				console.log(this.presentSuccessAlert(this.userData.fname));
				this.router.navigateByUrl('/log-in');
			}
			else
			{
				console.log(this.presentFailAlert(res));
			}
			}, error => {
				console.log(this.presentFailAlert(error));
			});
	}



}

/*
TESTER REGISTER
register() {
	  //Firstly, check database for the above inputs
	  //If all 4 checks returns true, go back to LogIn
	  //THIS IS JUST A TEST.
			//First Name = admin
			//Last Name = tester
			//School ID = 999999
			//Password = 123456
		if(this.fName == "admin" &&
			this.lName == "tester" &&
			this.uID == "999999" &&
			this.uPW == "123456") {
				this.presentAlert();
				this.router.navigateByUrl('/log-in');
			}

  }

  this.http.post(this.regUrl, data, {responseType: 'text'}).subscribe(res =>
			{
				//console.log(res)
				if(res=='Register Success')
				{
					this.presentSuccessAlert();
					this.router.navigateByUrl('/log-in');
				}
				}, error => {
					console.log(this.presentFailAlert(error));
				});

*/
