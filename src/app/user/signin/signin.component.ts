import { Component, OnInit } from '@angular/core';
import { MyauthService } from 'src/app/services/myauth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  exampleForm: FormGroup;
  validation_messages = {
    'uname': [
      { type: 'required', message: 'E-mail is required!' }
    ],
    'pwd': [
      { type: 'required', message: 'Password is required!' }
    ]
  };

  constructor(private myauth:MyauthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  signIn(value){
    this.myauth.SignIn(value.uname, value.pwd)
  }
  goRegister(){
    this.router.navigateByUrl('register');
  }
  
  createForm(){
    this.exampleForm = this.fb.group({
      uname: ['', Validators.required ],
      pwd: ['', Validators.required ]
    });
  }

}
