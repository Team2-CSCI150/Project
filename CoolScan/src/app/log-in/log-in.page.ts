import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
	
	uname: string = "";
	pword: string = "";
	
  constructor(public alertCtrl: AlertController, private router: Router) { 
  
  }
  ngOnInit() {
	  
  }
	async presentAlert() {
		const alert = await this.alertCtrl.create({
			header: 'Hello!',
			message: 'Logged in as Admin for Testing',
			buttons: ['OK'],
		});
		
		await alert.present();
		let result=await alert.onDidDismiss();
		console.log(result);
	}
	
	login() {
		//THIS IS JUST A TEST, enter username as admin, and password as 123456
		if(this.uname == "admin" && this.pword == "123456") {
			//This here will check the database for userID and password
			this.presentAlert();
		}
		this.router.navigateByUrl('/home');
	}
	
	
}
