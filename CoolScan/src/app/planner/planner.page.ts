import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { NavController, AlertController, ModalController } from '@ionic/angular';
//import * as moment from 'moment';
@Component({
  selector: 'app-planner',
  templateUrl: './planner.page.html',
  styleUrls: ['./planner.page.scss'],
})

export class PlannerPage implements OnInit{
  event = { //components gotten from the plugin
	id:'',
	title:'',
	desc: '',
	startTime:'',
	endTime: '',
	allDay: false
  };

  minDate= new Date().toISOString();

  events= [];
  eventSource = [];
  getClassUrl = 'http://localhost/csci150/getevent.php';
  storeUrl = 'http://localhost/csci150/storeEvent.php';
  calendar = {
    mode: 'day',
    currentDate: new Date()
  };
  viewTitle= '';

  @ViewChild(CalendarComponent, {static: false}) myCal: CalendarComponent;
  constructor(public alertCtrl: AlertController,
              @Inject(LOCALE_ID)private locale: string,
              private http: HttpClient	) { //return promise to oneventseleceted
  }
  studentName = '';
  student_id = '';
  ngOnInit(){
	this.resetEvent();
//get session storage stuf
  this.studentName = JSON.parse(sessionStorage.getItem('loggedUser'));
  this.student_id = sessionStorage.getItem('UserID');
  this.event.title = sessionStorage.getItem('event_name');
  this.event.desc = sessionStorage.getItem('event_desc');
  this.event.startTime = sessionStorage.getItem('start_time');
  this.event.endTime = sessionStorage.getItem('end_time');
  this.getEntries(this.student_id);
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

//get db entries and load to calendar
  getEntries(student)
  {
    let res;
    let data = JSON.stringify({
      'student_id': this.student_id,
      'event_name': this.event.title,
      'event_desc': this.event.desc,
      'start_time': this.event.startTime,
      'end_time': this.event.endTime
    });



    //console.log("Data: " + data);
    this.http.post(this.getClassUrl, data).subscribe(res=>{
        console.log();
        if(res[0] == 'Get event was Success!')
        {
          console.log(res[1]);
          //this.geteventdb();
          let t = res[1].length;
          console.log(t);
          for (var i=0; i<res[1].length; i++){
            let temp = {
              title: res[1][i]['event_name'],
              desc: res[1][i]['event_desc'],
              startTime: new Date(res[1][i]['start_time']),
              endTime: new Date(res[1][i]['end_time']),
              allDay: false
            };
            console.log(temp);
            this.eventSource.push(temp);
            this.myCal.loadEvents();
            this.resetEvent();
          }

        }
        else
        {
          console.log(this.presentGetEntriesError(res[0]));
        }
      }, error => {
          //console.log(this.presentGetEntriesError(error));
      });
  }

  //up to here
  resetEvent(){
	this.event = {
		id:'',
		title:'',
		desc: '',
		startTime: new Date().toISOString(),
		endTime: new Date().toISOString(),
		allDay: false
	};
  }

  addEvent(){
	  let eventCopy ={
		  title: this.event.title,
		  startTime: new Date(this.event.startTime),
		  endTime: new Date(this.event.endTime),
		  allDay: this.event.allDay,
		  desc: this.event.desc
	  }
	  if (eventCopy.allDay){
		  let start = eventCopy.startTime;
		  let end = eventCopy.endTime;
		  eventCopy.startTime= new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
		  eventCopy.endTime= new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() +1));
	  }
	  //this.eventSource = [];
    this.storeevent(eventCopy);
	  this.eventSource.push(eventCopy);
	  this.myCal.loadEvents();
	  this.resetEvent();
  }  
  storeevent(eventCopy){
    let data = JSON.stringify ({
      'student_id': this.student_id,
      'event_name': eventCopy.title,
      'start_time': eventCopy.startTime,
      'end_time': eventCopy.endTime,
      'event_desc' : eventCopy.desc
    });
    console.log(data);
    this.http.post(this.storeUrl, data).subscribe(res=>{
        if(res == "Event Stored!")
        {
          console.log('good');
        }
        else
        {
          console.log(this.presentGetEntriesError(res));
        }
      }, error => {
          console.log(this.presentGetEntriesError(error));
      });
  }
  changeMode(mode){
    this.calendar.mode =mode;
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  today()  {
    this.calendar.currentDate = new Date();
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  async onEventSelected(event) {
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'Begins at<br>'+start,
      buttons: ['OK']
    });
    alert.present();
  }
  onTimeSelected(even) {
    let selected = new Date(even.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours()+1);
    this.event.endTime = (selected.toISOString());
  }
}
