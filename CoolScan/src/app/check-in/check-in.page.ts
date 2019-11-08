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
    //document.getElementById('demo').innerHTML = "Button clicked!";
    this.geolocation.getCurrentPosition().then((resp) => {
      document.getElementById('demo1').innerHTML = "Latitude: " + resp.coords.latitude.toString();
      document.getElementById('demo2').innerHTML = "Longitude: " + resp.coords.longitude.toString();
      console.log(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
