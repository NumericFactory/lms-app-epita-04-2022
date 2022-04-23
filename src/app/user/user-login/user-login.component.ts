import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  loginForm:FormGroup;
  isSubmitted:boolean = false

  constructor(private fb:FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
   }

  ngOnInit(): void {
  }

  onSubmitLoginForm() {
    this.isSubmitted = true;
    console.log(this.loginForm.valid)
    console.log(this.loginForm.value)
  }

}
