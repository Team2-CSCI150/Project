import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
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

  eventSource = [];
  getClassUrl = 'http://localhost/csci150/getClasses.php';
  calendar = {
    mode: 'day',
    currentDate: new Date()
  };
  viewTitle= '';

  @ViewChild(CalendarComponent, {static: false}) myCal: CalendarComponent;
  constructor(private alertCtrl: AlertController,
              @Inject(LOCALE_ID)private locale: string) { //return promise to oneventseleceted
  }
  studentName = '';
  studentID = '';
  ngOnInit(){
	this.resetEvent();
  this.studentName = JSON.parse(sessionStorage.getItem('loggedUser'));
  this.studentID = sessionStorage.getItem('UserID');
  }
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
//change
  /*getEntries(student,classIndx,classname)
  {
    let res;
    let data = JSON.stringify({
      'student_id': event.student_id,
      'event_name': this.event.title,
      'event_desc': this.event.desc,
      'start_time': this.startTime,
      'start_day': this.startTime,
      'end_time': this.endTime,
      'end_day':this.endTime,
    });
    //console.log("Data: " + data);
    this.http.post(this.getEntriesUrl, data).subscribe(res=>{
        if(res[0] == 'Event saved!')
        {
            let temp = {
              'title': event_name,
              '': Number.parseFloat(res[1]).toPrecision(3)
            };
            this.displayClasses.push(temp);
        }
        else
        {
          console.log(this.presentGetEntriesError(res[0]));
        }
      }, error => {
          console.log(this.presentGetEntriesError(error));
      });
  }*/
  //up to here
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
      message: 'Begins at'+start+'<br>Ends at'+ end,
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
