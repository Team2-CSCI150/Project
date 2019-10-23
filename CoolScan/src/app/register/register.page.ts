import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	fName: string="";
	lName: string="";
	uID:   string="";
	uPW:   string="";
  constructor(public alertCtrl: AlertController, private router: Router) {
  }

  ngOnInit() {
  }
  
  async presentAlert() {
		const alert = await this.alertCtrl.create({
			header: 'Congrats!',
			message: 'You just Registered as Admin Tester for testing! Directed back to Log In',
			buttons: ['OK'],
		});
		
		await alert.present();
		let result=await alert.onDidDismiss();
		console.log(result);
	}
  
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

}
