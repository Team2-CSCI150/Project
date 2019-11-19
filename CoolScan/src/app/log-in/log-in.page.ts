import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment, LOGIN_URL} from '../../environments/environment';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

	uname: string = "";
	pword: string = "";
	data: string = "";

  constructor(public alertCtrl: AlertController,
  				private router: Router,
  				public load: LoadingController,
  				private http: HttpClient
  				) {

  }
  ngOnInit() {

  }
	async presentSuccessLogInAlert(username) {
		const alert = await this.alertCtrl.create({
			header: 'Hello ' + username + '!',
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

		this.http.post(LOGIN_URL, data).subscribe(res => {
			if(res[0] == 'Login Success')
			{
				console.log(this.presentSuccessLogInAlert(res[1]));
				sessionStorage.setItem('UserID', this.uname);
				sessionStorage.setItem('loggedUser', JSON.stringify(res[1]));
				this.router.navigateByUrl('/home');
			}
			else
			{
				console.log(this.presentFailLogInAlert(res[0]));
			}
			}, error => {
				console.log(this.presentFailLogInAlert(error));
			});
	}
}
