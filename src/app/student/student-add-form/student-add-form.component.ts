import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-student-add-form',
  templateUrl: './student-add-form.component.html',
  styleUrls: ['./student-add-form.component.scss']
})
export class StudentAddFormComponent implements OnInit {

  studentForm:FormGroup;

  constructor(private fb:FormBuilder, private studentSvc:StudentService) { 

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
        next : response => console.log(response),
      }
      )
    }
  }

}
