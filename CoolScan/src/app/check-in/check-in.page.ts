import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})


    var onSuccess = function(position) {
            alert('Latitude: '          + position.coords.latitude          + '\n' +
	                  'Longitude: '         + position.coords.longitude         + '\n' +
			                'Altitude: '          + position.coords.altitude          + '\n' +
					              'Accuracy: '          + position.coords.accuracy          + '\n' +
						                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
								                  'Heading: '           + position.coords.heading           + '\n' +
										                'Speed: '             + position.coords.speed             + '\n' +
												              'Timestamp: '         + position.timestamp                + '\n');
													          };

														      // onError Callback receives a PositionError object
														          //
															      function onError(error) {
															              alert('code: '    + error.code    + '\n' +
																                    'message: ' + error.message + '\n');
																		        }

																			    navigator.geolocation.getCurrentPosition(onSuccess, onError);


export class CheckInPage implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  //
  checkIn() {
    document.getElementById('demo').innerHTML = "Button Clicked!";
  }

}
