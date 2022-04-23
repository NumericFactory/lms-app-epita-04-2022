import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-student-add-form',
  templateUrl: './student-add-form.component.html',
  styleUrls: ['./student-add-form.component.scss']
})
export class StudentAddFormComponent implements OnInit {

  studentForm:FormGroup;

  constructor(
    private fb:FormBuilder, 
    private studentSvc:StudentService,
    private alertSvc:AlertService,
    private router: Router
    ) { 

    this.studentForm = this.fb.group({
      first: ['', [Validators.required, Validators.minLength(2)] ],
      last: ['', [Validators.required, Validators.minLength(2)] ],
      email: ['', Validators.email ],
      city: '',
      mobile: '',
      situation: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  onSubmitForm() {
    if(this.studentForm.valid) {
      let newStudent = this.studentForm.value;
      this.studentSvc.createNewStudentInApi(newStudent).subscribe({
        next : (studentId:string) => {
          newStudent.id = studentId;
          let studentsArray = this.studentSvc.getStudents();
          studentsArray = [newStudent,...studentsArray];
          this.studentSvc.setStudents$(studentsArray);
          this.alertSvc.showMessage('Vous avez bien ajouté un nouvel apprenant');
          this.router.navigate(['/students'])
        }

      }
      )
    }
  }

}
