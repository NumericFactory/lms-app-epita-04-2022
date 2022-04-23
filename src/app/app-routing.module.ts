import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { StudentAddFormComponent } from './student/student-add-form/student-add-form.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { UserLoginComponent } from './user/user-login/user-login.component';

const routes: Routes = [
  { path: '', component:CourseComponent },
  { 
    path: 'students',
    children: [
      {path: '', pathMatch:'full',redirectTo: 'list'},
      {
        path: 'list',
        component: StudentListComponent
      },
      {
        path: 'detail/:id',
        component: StudentDetailComponent
      },
      {
        path: 'add',
        component: StudentAddFormComponent
      },
      
    ]
  },
  // Auth : login, signup
  {
    path:'login',
    component:UserLoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
