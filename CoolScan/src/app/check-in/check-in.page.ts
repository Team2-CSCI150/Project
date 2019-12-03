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
  classFound;
  classFoundID;
  date;
  tgtLatitude;
  tgtLongitude;
  latVariance;
  longVariance;
  studentID;

  ngOnInit() {
    console.log(sessionStorage.getItem('classes'));
    this.studentID = sessionStorage.getItem("UserID");
    this.classIDs = JSON.parse(sessionStorage.getItem('classes'));
    this.classKeys = Object.keys(this.classIDs);
    this.tgtLatitude = 0.0;
    this.tgtLongitude = 0.0;
    this.latVariance = 0.0;
    this.longVariance = 0.0;
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

  async endLoading(){
    return await this.loadingController.dismiss();
  }

  hideLoader(){
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 3000);
  }

  async checkIn() {
    //Show loading prompt
    let loading = this.presentLoading();

    //Get date for use later
    this.date = new Date();
    //if(this.date.getDay() == 0 || this.date.getDay() == 6) document.getElementById('demo3').innerHTML = "No school on weekends!";
    if(this.date.getDay() < 0) document.getElementById('demo3').innerHTML = "No school on weekends!";
    else {
      //Find the student's class currently in session
      await this.getClassInSession();

      //GPS initialization
      this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
        //Create map
        this.getMap(resp.coords.latitude,resp.coords.longitude);

        //Get class to check-in to
        let currentClass = this.getClassInSession();

        //Definition of coordinates
        let orgLat = resp.coords.latitude;
        let orgLong = resp.coords.longitude;
        let tgtLatLower = this.tgtLatitude - this.latVariance;
        let tgtLatUpper = this.tgtLatitude + this.latVariance;
        let tgtLongLower = this.tgtLongitude - this.longVariance;
        let tgtLongUpper = this.tgtLongitude + this.longVariance;

        //Debugging info
        console.log("Latitude: ",orgLat.toString());
        console.log("Longitude: ",orgLong.toString());
        console.log("Accuracy: ",resp.coords.accuracy)
        console.log("Target Latitude: ",this.tgtLatitude);
        console.log("Target Longitude: ",this.tgtLongitude);
        console.log("Lattitude Variance: ",this.latVariance);
        console.log("Longitude Variance: ",this.longVariance);
        console.log("Target Latitude Lower Bound: ",tgtLatLower);
        console.log("Target Latitude Upper Bound: ",tgtLatUpper);

        this.hideLoader();

        //Check if user is in range
        if ((tgtLatLower <= orgLat && orgLat <= tgtLatUpper) && (tgtLongLower <= orgLong && orgLong <= tgtLongUpper)) {
          let data = JSON.stringify({
            'classID': this.classFoundID,
            'studentID': this.studentID
          });
          this.http.post(ATTENDANCE_URL, data).subscribe(res=>{}, error => {
            console.log(error);
          });
          console.log(this.presentCheckInResult('Check-in Success! ' + this.classFound + ' attendance grade will be updated.'));
        }
      }).catch((error) => {
        this.hideLoader();
        this.presentCheckInResult('Check-in Failed! ' + error.message + '. Please try again later.');
        console.log('Error getting location', error.message);
      });
    }
  }

  async getClassInSession(){
    let day;
    if (this.date.getDay() == 1) day = 'M';
    else if (this.date.getDay() == 2) day = 'TU';
    else if (this.date.getDay() == 3) day = 'W';
    else if (this.date.getDay() == 4) day = 'TH';
    else if (this.date.getDay() == 5) day = 'F';
    else day = 'NA';
    //USED FOR TESTING
    day = 'TU';
    for (let i in this.classKeys){
      let found = false;
      let res;
      let data = JSON.stringify({
        'classID': this.classKeys[i],
        'day': day
      });
      await this.http.post(CHECKIN_URL, data).subscribe(res=>{
        if(res[0] == 'Class is currently in session'){
          this.tgtLatitude = Number.parseFloat(res[1]);
          this.tgtLongitude = Number.parseFloat(res[2]);
          this.latVariance = Number.parseFloat(res[3]);
          this.longVariance = Number.parseFloat(res[4]);
          this.classFound = this.classIDs[this.classKeys[i]];
          this.classFoundID = this.classKeys[i];
          found = true;
        }
        else console.log(res + '. Loop: ' + i);
      }, error => {
        console.log(error);
      });
      if (found) break;
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
