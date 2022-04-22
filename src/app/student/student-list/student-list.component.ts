import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/shared/models/student.model';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  displayedColumns:string[] = ['last', 'first', 'city', 'mobile', 'action'];
  students:StudentModel[] = [];

  constructor(private studentSvc: StudentService) { }

  ngOnInit(): void {
    this.studentSvc.getStudentsFromApi().subscribe(
      data => {
        console.log(data)
        this.students = data
  
      }
    )
  }

  getStudentAction(id:string) {
    console.log(id)
  }

}
