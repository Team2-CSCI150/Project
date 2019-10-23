import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'log-in', pathMatch: 'full' },
  { path: 'log-in', loadChildren: () => import('./log-in/log-in.module').then( m => m.LogInPageModule)},
  { path: 'grades', loadChildren: './grades/grades.module#GradesPageModule' },
  { path: 'check-in', loadChildren: './check-in/check-in.module#CheckInPageModule' },
  { path: 'inbox', loadChildren: './inbox/inbox.module#InboxPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'planner', loadChildren: './planner/planner.module#PlannerPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },  { path: 'attendance-report', loadChildren: './attendance-report/attendance-report.module#AttendanceReportPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
