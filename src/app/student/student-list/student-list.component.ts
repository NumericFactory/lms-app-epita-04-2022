import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StudentModel } from 'src/app/shared/models/student.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  dataSource = new MatTableDataSource<StudentModel>();
  displayedColumns:string[] = [
    'last', 
    'first', 
    'city', 
    'mobile', 
    'in_track', 
    'track_start', 
    'track_end', 
    'track_progress', 
    'action'
  ];
 
  constructor(
    private studentSvc: StudentService, 
    private router:Router,
    private alertSvc:AlertService) { }

  @ViewChild(MatSort) sort:any;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.studentSvc.students$.subscribe(
      (data:StudentModel[]) => {
        if(data.length>0) {
          this.dataSource.data = data;
        }
        else {
          this.studentSvc.getStudentsFromApi()
        }
      }
    )
  } // fin ngOnInit()


  getStudentAction(id:string) {
    this.router.navigate(['/students/detail', id])
  }

  sortData(sort: Sort) {
   
  }

  deleteStudentAction(studentId:string) {
    this.studentSvc.deleteStudentInApi(studentId).subscribe(
      (response) => {
        if(response.deleted) {
          // suppression 
          let studentsArray = this.studentSvc.getStudents();
          let index = studentsArray.findIndex(student => student.id == response.detail)
          studentsArray.splice(index, 1);   
          // mise à jour de _students$
          this.studentSvc.setStudents$(studentsArray);
          // afficher message de succès
          this.alertSvc.showMessage('Cet apprenant a bien été supprimé')
        }
      }
    )
  }

}
