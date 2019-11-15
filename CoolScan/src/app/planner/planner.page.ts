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
  calendar = {
    mode: 'week',
    currentDate: new Date()
  };
  viewTitle= '';
  
  @ViewChild(CalendarComponent, {static: false}) myCal: CalendarComponent;
  constructor() {
  }
  
  ngOnInit(){
	this.resetEvent();  
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
  
  onViewTitleChanged() {
  
  }
  onEventSelected() {
    
  }
  onTimeSelected() {
    
  }
}
