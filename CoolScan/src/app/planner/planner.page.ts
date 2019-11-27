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
  studentID = '';
  ngOnInit(){
	this.resetEvent();
  this.studentName = JSON.parse(sessionStorage.getItem('loggedUser'));
  this.studentID = sessionStorage.getItem('UserID');
  this.event.title = sessionStorage.getItem('event_title');
  this.event.desc = sessionStorage.getItem('event_desc');
  this.event.startTime = sessionStorage.getItem('start_time');
  this.event.endTime = sessionStorage.getItem('end_time');
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


//change
  getEntries(student,classIndx,classname)
  {
    let res;
    let data = JSON.stringify({
      'event_name': this.event.title,
      'event_desc': this.event.desc,
      'start_time': this.event.startTime,
      'end_time': this.event.endTime,
    });

    //console.log("Data: " + data);
    this.http.post(this.getClassUrl, data).subscribe(res=>{
        if(res[0] == 'Event saved!')
        {
            let temp = {
              'title': this.event.title
            };
            this.events.push(temp);
        }
        else
        {
          console.log(this.presentGetEntriesError(res[0]));
        }
      }, error => {
          console.log(this.presentGetEntriesError(error));
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
	  this.eventSource.push(eventCopy);
	  this.myCal.loadEvents();
	  this.resetEvent();
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
      message: 'Begins at'+start,
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
