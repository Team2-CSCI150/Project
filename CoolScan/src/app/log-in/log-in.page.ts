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
  				public navCtrl: NavController,
  				private router: Router, 
  				public load: LoadingController,
  				private http: HttpClient	
  				) { 
  
  }
  
  ngOnInit() {
	  
  }

	async presentSuccessLogInAlert(username) {
		const alert = await this.alertCtrl.create({
			header: 'Hello! ' + username,
			message: 'Log in Succcessful!',
			buttons: ['OK'],
		});
		
		await alert.present();
		let result=await alert.onDidDismiss();
		console.log(result);
	}

	async presentFailLogInAlert(error)
	{
		const alert = await this.alertCtrl.create({
			header: 'Log In Failed',
			message: 'Either your id or password is incorrect: ' + error,
			buttons: ['OK'],
		});
		
		await alert.present();
		let result=await alert.onDidDismiss();
		console.log(result);
	}
	
	login() {
		let res;
		let data = JSON.stringify({
			"uid": this.uname,
			"upw": this.pword
		});

		this.http.post(this.logUrl, data).subscribe(res => {
			if(res[0] == 'Login Success')
			{
				console.log(this.presentSuccessLogInAlert(res[1]));
				sessionStorage.setItem('loggedUser',res[1]);
				sessionStorage.setItem('UserID', this.uname);
				this.router.navigate(['/home']);
			}
			else
			{
				console.log(this.presentFailLogInAlert(res[0]));
			}
			}, error => {
				console.log(this.presentFailLogInAlert(error[0]));
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