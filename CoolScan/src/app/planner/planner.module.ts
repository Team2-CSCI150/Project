import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgCalendarModule } from 'ionic2-calendar';

import {IonicModule } from '@ionic/angular';

import { PlannerPage } from './planner.page';


@NgModule({
  imports: [
	NgCalendarModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
	{
	path: '',
    component: PlannerPage
	}
	])
  ],
  declarations: [PlannerPage]
})
export class PlannerPageModule {}
