import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { map } from 'rxjs/operators';
import { environment, CHECKIN_URL, ATTENDANCE_URL} from '../../environments/environment';

declare var google;

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})

export class CheckInPage implements OnInit {
  constructor(public alertCtrl: AlertController,
              public loadingController: LoadingController,
              private router: Router,
              private http: HttpClient,
              private geolocation: Geolocation) {}

  classIDs = [];
  classKeys = [];
  isLoading;
  studentID;

  ngOnInit() {
    console.log(sessionStorage.getItem('classes'));
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

  async presentLoading(){
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Checking in...',
      animated: true
    })
    return await loading.present();
  }

  hideLoader(){
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 1000);
  }

  async vicinityCheck(tgtLat,tgtLong,latV,longV,className,classID) {
    //GPS initialization
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
      //Create map
      this.getMap(resp.coords.latitude,resp.coords.longitude);

      //Definition of coordinates
      let orgLat = resp.coords.latitude;
      let orgLong = resp.coords.longitude;
      let tgtLatLower = tgtLat - latV;
      let tgtLatUpper = tgtLat + latV;
      let tgtLongLower = tgtLong - longV;
      let tgtLongUpper = tgtLong + longV;

      //Debugging info
      console.log("Latitude: ",orgLat.toString());
      console.log("Longitude: ",orgLong.toString());
      console.log("Accuracy: ",resp.coords.accuracy)
      console.log("Target Latitude: ",tgtLat);
      console.log("Target Longitude: ",tgtLong);
      console.log("Lattitude Variance: ",latV);
      console.log("Longitude Variance: ",longV);
      console.log("Target Latitude Lower Bound: ",tgtLatLower);
      console.log("Target Latitude Upper Bound: ",tgtLatUpper);

      //Check if user is in range
      if ((tgtLatLower <= orgLat && orgLat <= tgtLatUpper) && (tgtLongLower <= orgLong && orgLong <= tgtLongUpper)) {
        let data = JSON.stringify({
          'classID': classID,
          'studentID': this.studentID
        });
        console.log(this.presentCheckInResult('Check-in Success! ' + className + ' attendance grade will be updated.'));
        this.http.post(ATTENDANCE_URL, data).subscribe(res=>{
          console.log(res);
          let result = res[0];
          let rate = (result.Attempted/result.MaxScore) * 100;
          document.getElementById('report-header').innerHTML = "Attendance Report - " + className;
          document.getElementById('report-results').innerHTML = rate + "%";
          document.getElementById('checkInButton').setAttribute("disabled", "true");
        }, error => {
          document.getElementById('report-header').innerHTML = "Error retrieving class to check-in to!";
          document.getElementById('report-results').innerHTML = "Please make sure you are in class vicinity or try again later.";
          console.log(error);
        });
      }
      else document.getElementById('report-header').innerHTML = "Not in range or class is not in session!";
      document.getElementById('report-results').innerHTML = "Please try again later.";
      this.hideLoader();
    }).catch((error) => {
      this.hideLoader();
      this.presentCheckInResult('Check-in Failed! ' + error.message + '. Please try again later.');
      console.log('Error getting location', error.message);
    });
  }

  checkIn(){
    //Show loading prompt
    let loading = this.presentLoading();
    //Variables
    let date = new Date();
    let day;
    if (date.getDay() == 1) day = 'M';
    else if (date.getDay() == 2) day = 'TU';
    else if (date.getDay() == 3) day = 'W';
    else if (date.getDay() == 4) day = 'TH';
    else if (date.getDay() == 5) day = 'F';
    else day = 'NA';
    //FOLLOWING USED FOR TESTING
    day = 'W';
    for (let i in this.classKeys){
      let found = false;
      let res;
      let data = JSON.stringify({
        'classID': this.classKeys[i],
        'day': day
      });
      this.http.post(CHECKIN_URL, data).subscribe(res=>{
        if(res[0] == 'Class is currently in session'){
          let tgtLat = Number.parseFloat(res[1]);
          let tgtLong = Number.parseFloat(res[2]);
          let latV = Number.parseFloat(res[3]);
          let longV = Number.parseFloat(res[4]);
          let className = this.classIDs[this.classKeys[i]];
          let classID = this.classKeys[i];
          found = true;
          this.vicinityCheck(tgtLat,tgtLong,latV,longV,className,classID);
        }
        else console.log(res + '. Loop: ' + i);
      }, error => {
        console.log(error);
      });
      if (found == true) break;
    }
    if (found == false){
      //CLASS NOT FOUND DO SOME ERROR THING HERE
    }
  }

  getMap(latitude, longitude) {
    let mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    let map = new google.maps.Map(document.getElementById('map'), mapOptions);
    let latLong = new google.maps.LatLng(latitude, longitude);
    let marker = new google.maps.Marker({
        position: latLong
    });

    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());
  }
}
