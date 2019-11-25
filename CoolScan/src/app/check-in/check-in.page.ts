import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { map } from 'rxjs/operators';
import { environment, CHECKIN_URL} from '../../environments/environment';

declare var google;

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
      this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
        //Create map
        this.getMap(resp.coords.latitude,resp.coords.longitude);
        //Get class to check-in to
        var currentClass = this.getClassInSession();
        //Definition of coordinates
        var orgLat = resp.coords.latitude.toPrecision(5);
        var orgLong = resp.coords.longitude.toPrecision(5);
        var tgtLat = this.tgtLatitude.toPrecision(5);
        var tgtLong = this.tgtLongitude.toPrecision(5);

        //Retrieval of student's coordinates
        console.log("resp: ",resp)
        console.log("Latitude: ",orgLat.toString());
        console.log("Longitude: ",orgLong.toString());
        console.log("Accuracy: ",resp.coords.accuracy)

        //Check if coordinates are the same
        if(orgLat == tgtLat && orgLong == tgtLong) console.log(this.presentCheckInResult('Check-in Success! ' + this.classFound + ' attendance grade will be updated.'));
      }).catch((error) => {
        console.log('Error getting location', error.message);
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
    //day = 'TU';
    for (let i=0; i<this.classKeys.length; i++){
      let found = false;
      let res;
      let data = JSON.stringify({
        'classID': this.classKeys[i],
        'day': day
      });
      this.http.post(CHECKIN_URL, data).subscribe(res=>{
        if(res[0] == 'Class is currently in session'){
          this.tgtLatitude = Number.parseFloat(res[1]);
          this.tgtLongitude = Number.parseFloat(res[2]);
          this.variance = res[3];
          this.classFound = this.classIDs[this.classKeys[i]];
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
