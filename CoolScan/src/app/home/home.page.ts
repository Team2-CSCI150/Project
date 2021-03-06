import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment, CLASSES_URL} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private menu: MenuController,
              private route: ActivatedRoute,
              public alertCtrl: AlertController,
              public navCtrl: NavController,
              private router: Router,
              public load: LoadingController,
              private http: HttpClient) {
              }

  studentName = '';
  studentID = '';
  classIDs = [];

  ngOnInit(){
    this.studentName = JSON.parse(sessionStorage.getItem('loggedUser'));
    this.studentID = sessionStorage.getItem('UserID');
  }

  async presentGetClassesError(error) {
    const alert = await this.alertCtrl.create({
      header: 'Failed To Get Classes',
      message: 'Cannot Get Error: ' + error,
      buttons: ['OK'],
    });

    await alert.present();
    let result=await alert.onDidDismiss();
    console.log(result);
    }

  getClasses(navLink)
  {
    let res;
      //Convert to Json string to send to php file
      let data = JSON.stringify({
          studentID: this.studentID,
      });
      //Post to php file and return success or fail
      this.http.post(CLASSES_URL, data).subscribe(res=>{
        console.log(res[0]);
        if(res[0] == 'Get Classes Succes!')
        {
          //console.log(res[0]);
          this.classIDs = res[1];
          sessionStorage.setItem('classes',JSON.stringify(this.classIDs));
          //console.log(this.classIDs);
          this.router.navigate(['/'+navLink]);
        }
        else
        {
          console.log(this.presentGetClassesError(res[0]));
      }
      }, error => {
          console.log(this.presentGetClassesError(error));
        });
  }

  logOut()
  {
      sessionStorage.clear();
      this.router.navigate(['/log-in']);
  }


}
