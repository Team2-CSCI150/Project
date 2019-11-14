import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-grade-report',
  templateUrl: './grade-report.page.html',
  styleUrls: ['./grade-report.page.scss'],
})
export class GradeReportPage implements OnInit {

  entries = [];
  studentID;
  classEntry = {};
  attemptedScore =0;
  totalScore =0;
  getEntriesUrl = 'http://localhost/csci150/getEntries.php';


  constructor(public alertCtrl: AlertController, 
          public navCtrl: NavController,
          private router: Router, 
          public load: LoadingController,
          private http: HttpClient ) { }

  ngOnInit() {
    this.studentID = sessionStorage.getItem('UserID');
    this.classEntry = JSON.parse(sessionStorage.getItem('getClassEntries'));

    console.log(this.studentID);
    console.log(this.classEntry);
    this.getEntries(this.studentID, this.classEntry['classid']);
  }

  async presentGetEntriesError(error) {
    const alert = await this.alertCtrl.create({
      header: 'Failed To Get Entries',
      message: 'Cannot Get Error: ' + error,
      buttons: ['OK'],
    });
    
    await alert.present();
    let result=await alert.onDidDismiss();
    console.log(result);
    }

  getEntries(student, classid)
  {
    let res;
      let data = JSON.stringify({
        'studentID': student,
        'classID': classid,
        'showWhat': 'entries'
      });
      //console.log("Data: " + data);
      this.http.post(this.getEntriesUrl, data).subscribe(res=>{
          if(res[0] == 'Get Entries Success!')
          {
              //console.log(res[1].length);
              for(var i=0; i<res[1].length; i++)
              {
                let temp = {
                  'name': res[1][i].AssignName,
                  'type': res[1][i].AssignType,
                  'score': res[1][i].Attempted+"/"+res[1][i].MaxScore
                };
                this.entries.push(temp);
                this.attemptedScore += Number(res[1][i].Attempted);
                this.totalScore += Number(res[1][i].MaxScore);
              }
          }
          else
          {
            console.log(this.presentGetEntriesError(res[0]));
          }
        }, error => {
            console.log(this.presentGetEntriesError(error));
        });
  }

}
