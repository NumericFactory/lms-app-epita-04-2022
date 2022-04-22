import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { StudentAddFormComponent } from './student/student-add-form/student-add-form.component';
import { StudentListComponent } from './student/student-list/student-list.component';

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
          path: 'add',
          component: StudentAddFormComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
