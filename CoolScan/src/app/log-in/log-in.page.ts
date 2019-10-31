import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
	
	uname: string = "";
	pword: string = "";
	data: string = "";
	logUrl = 'http://localhost/csci150/log-in.php';
	
  constructor(public alertCtrl: AlertController, 
  				private router: Router, 
  				public load: LoadingController,
  				private http: HttpClient	
  				) { 
  
  }
  ngOnInit() {
	  
  }
	async presentSuccessLogInAlert() {
		const alert = await this.alertCtrl.create({
			header: 'Hello! ' + this.uname,
			message: 'Log in Succcessful!',
			buttons: ['OK'],
		});
		
		await alert.present();
		let result=await alert.onDidDismiss();
		console.log(result);
	}

	async presentFailLogInAlert()
	{
		const alert = await this.alertCtrl.create({
			header: 'Log In Failed',
			message: 'Either your id or password is incorrect',
			buttons: ['OK'],
		});
		
		await alert.present();
		let result=await alert.onDidDismiss();
		console.log(result);
	}
	
	login() {
		let res;
		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			})
		};
		let data = JSON.stringify({
			"UserID": this.uname,
			"UserPassword": this.pword
		});

		this.http.post(this.logUrl, data).pipe(map(res => (<Response>res).json())).subscribe(res => {
				console.log(res);
				if(data == "Login Success")
				{
					this.presentSuccessLogInAlert();
					this.router.navigateByUrl('/home');
				}
			}, error => {
				console.log(this.presentFailLogInAlert());
			});
	}
	
	
}

/*
TESTER LOGIN
login() {
		//THIS IS JUST A TEST, enter username as admin, and password as 123456
		if(this.uname == "admin" && this.pword == "123456") {
			//This here will check the database for userID and password
			this.presentAlert();
		}
		this.router.navigateByUrl('/home');
	}

	this.http.get(this.logUrl, data, 
			{headers: {'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Control-Allow-Methods': 'POST'}}).pipe(map(res=>res.json())).subscribe(res=>{
					console.log(res);
					}, error => {
						console.log(error);
					});
		if(res == "Login Success")
		{
			this.presentSuccessLogInAlert();
			this.router.navigateByUrl('/home');
		}

*/