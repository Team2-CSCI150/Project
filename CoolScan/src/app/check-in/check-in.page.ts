import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})

export class CheckInPage implements OnInit {
  constructor(public alertCtrl: AlertController,
              private router: Router,
              private http: HttpClient,
              private geolocation: Geolocation) {}

  getSessionUrl = 'http://localhost/csci150/getSession.php';
  classIDs = [];
  classKeys = [];
  classFound;
  date;
  tgtLatitude;
  tgtLongitude;
  variance;
  studentID;

  ngOnInit() {
    this.studentID = sessionStorage.getItem("UserID");
    this.classIDs = JSON.parse(sessionStorage.getItem('classes'));
    this.classKeys = Object.keys(this.classIDs);
  }

  async presentCheckInResult(msg){
    const alert = await this.alertCtrl.create({
      header: 'Result',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
    let result=await alert.onDidDismiss();
    console.log(result);
  }

  checkIn() {
    this.date = new Date();
    //if(this.date.getDay() == 0 || this.date.getDay() == 6) document.getElementById('demo3').innerHTML = "No school on weekends!";
    if(this.date.getDay() < 0) document.getElementById('demo3').innerHTML = "No school on weekends!";
    else {
      //Find the student's class currently in session
      this.getClassInSession();

      //GPS initialization
      this.geolocation.getCurrentPosition().then((resp) => {
        //Get class to check-in to
        var currentClass = this.getClassInSession();
        //Definition of coordinates
        var orgLat = resp.coords.latitude.toPrecision(5);
        var orgLong = resp.coords.longitude.toPrecision(5);
        var tgtLat = this.tgtLatitude.toPrecision(5);
        var tgtLong = this.tgtLongitude.toPrecision(5);

        //Retrieval of student's coordinates
        document.getElementById('demo1').innerHTML = "Latitude: " + orgLat.toString();
        document.getElementById('demo2').innerHTML = "Longitude: " + orgLong.toString();
        /*
        console.log('orgLat: ',orgLat);
        console.log('orgLong: ',orgLong);
        console.log('tgtLat: ',tgtLat);
        console.log('tgtLong: ',tgtLong);
        console.log('classIDs: ',this.classIDs);
        console.log('classFound: ',this.classFound);
        */

        //Check if coordinates are the same
        if(orgLat == tgtLat && orgLong == tgtLong) console.log(this.presentCheckInResult('Check-in Success! ' + this.classFound + ' attendance grade will be updated.'));
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }
  }

  getClassInSession(){
    let day;
    if (this.date.getDay() == 1) day = 'M';
    else if (this.date.getDay() == 2) day = 'TU';
    else if (this.date.getDay() == 3) day = 'W';
    else if (this.date.getDay() == 4) day = 'TH';
    else if (this.date.getDay() == 5) day = 'F';
    else day = 'NA';
    day = 'TU';
    for (let i=0; i<this.classKeys.length; i++){
      let found = false;
      let res;
      let data = JSON.stringify({
        'classID': this.classKeys[i],
        'day': day
      });
      this.http.post(this.getSessionUrl, data).subscribe(res=>{
        if(res[0] == 'Class is currently in session'){
          /* Debugging
          console.log('res1: ',res[1]);
          console.log('res2: ',res[2]);
          console.log('res3: ',res[3]);
          */
          this.tgtLatitude = Number.parseFloat(res[1]);
          this.tgtLongitude = Number.parseFloat(res[2]);
          this.variance = res[3];
          this.classFound = this.classIDs[this.classKeys[i]];
          found = true;
        }
        else console.log(res, 'Loop: ', i);
      }, error => {
        console.log(error);
      });
      if (found) break;
    }
  }

}
