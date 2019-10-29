import { Component} from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { formatDate } from '@angular/common';
import { NavController, AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-planner',
  templateUrl: './planner.page.html',
  styleUrls: ['./planner.page.scss'],
})
export class PlannerPage {
  eventSource = [];
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  
  onViewTitleChanged() {
    
  }
  onEventSelected() {
    
  }
  onTimeSelected() {
    
  }
}
