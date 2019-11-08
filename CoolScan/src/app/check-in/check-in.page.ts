import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})

export class CheckInPage implements OnInit {
  constructor(private geolocation: Geolocation) {}

  ngOnInit() {
  }

  checkIn() {
    //GPS initialization
    this.geolocation.getCurrentPosition().then((resp) => {
      
      //Definition of classroom coordinates
      //36.814, -119.75
      let tgtLatitude = 36.814;
      let tgtLongitude = -119.75;

      //Retrieval of student's coordinates
      document.getElementById('demo1').innerHTML = "Latitude: " + resp.coords.latitude.toString();
      document.getElementById('demo2').innerHTML = "Longitude: " + resp.coords.longitude.toString();
      console.log(resp.coords.latitude, resp.coords.longitude);

      //Check if coordinates are the same
      //toPrecision() rounds the number to specified length (5 in this case)
      //rounding is needed because different devices provide varying degrees of precision 
      if(resp.coords.latitude.toPrecision(5) == tgtLatitude) {
        if(resp.coords.longitude.toPrecision(5) == tgtLongitude) {
          document.getElementById('demo3').innerHTML = "Check-in Success!";
	}
      }
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
