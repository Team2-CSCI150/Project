import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	regUrl = 'http://localhost/csci150/register.php';
	userData = {"fname": "", "lname": "", "uid": "", "upw": ""};
	
  constructor(public alertCtrl: AlertController, 
				private router: Router,
				public authService: AuthServiceService,
				public load: LoadingController,
				public http: HttpClient) {
  }

  ngOnInit() {
  }
  
  async presentSuccessAlert() {
		const alert = await this.alertCtrl.create({
			header: 'Register Success',
			message: 'You just Registered as Admin Tester for testing! Directed back to Log In',
			buttons: ['OK'],
		});
		
		await alert.present();
		let result=await alert.onDidDismiss();
		console.log(result);
	}

	async presentFailAlert(error) {
		const alert = await this.alertCtrl.create({
			header: 'Register Failed',
			message: 'The information provide is either incorrect or this user is already registered. ' + error,
			buttons: ['OK'],
		});
		
		await alert.present();
		let result=await alert.onDidDismiss();
		console.log(result);
	}

	async presentFAlert() {}
	
	register() {
		let res;
		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};
		let data = JSON.stringify({
			fname: this.userData.fname,
			lname: this.userData.lname,
			uid: this.userData.uid,
			upw: this.userData.upw
		});
		this.http.post(this.regUrl, data, options).subscribe(res =>
			{
				console.log(res);
				}, error => {
					console.log(error);
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

  this.http.post(this.regUrl, data).pipe(map(res => (<Response>res).json())).subscribe(res => {
				console.log(res);
				if(data == "Register Success")
				{
					this.presentSuccessAlert();
					this.router.navigateByUrl('/log-in');
				}
			}, error => {
				console.log(error);
			});

*/
