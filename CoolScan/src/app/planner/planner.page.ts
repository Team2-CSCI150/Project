
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
  event = {
	id:'',
	title:'',
	desc: '',
	start:'',
	end: '',
	allDay: false
  };
  
  minDate= new Date().toISOString();
  
  eventSource = [];
  calendar = {
    mode: 'month',
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
		start: new Date().toISOString(),
		end: new Date().toISOString(),
		allDay: false
	};		
  }
  
  addEvent(){
	  
  }
  
  onViewTitleChanged() {
  
  }
  onEventSelected() {
    
  }
  onTimeSelected() {
    
  }
}
