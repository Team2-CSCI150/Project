import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'grades', loadChildren: './grades/grades.module#GradesPageModule' },
  { path: 'check-in', loadChildren: './check-in/check-in.module#CheckInPageModule' },
  { path: 'inbox', loadChildren: './inbox/inbox.module#InboxPageModule' },
  { path: 'log-in', loadChildren: './log-in/log-in.module#LogInPageModule' },
  { path: 'planner', loadChildren: './planner/planner.module#PlannerPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },  { path: 'attendance-report', loadChildren: './attendance-report/attendance-report.module#AttendanceReportPageModule' },
  { path: 'grade-report', loadChildren: './grade-report/grade-report.module#GradeReportPageModule' },
  { path: 'inbox-message', loadChildren: './inbox-message/inbox-message.module#InboxMessagePageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
