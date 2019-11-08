import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
})
export class GradesPage implements OnInit {

	data: any;
  constructor(public alertCtrl: AlertController, 
  				private router: Router,
  				private route: ActivatedRoute, 
  				public load: LoadingController,
  				private http: HttpClient	) 
  				{  				}

  ngOnInit() {
  }

}
