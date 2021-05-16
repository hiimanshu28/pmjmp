import { Component, OnInit } from '@angular/core';
import { MyauthService } from 'src/app/services/myauth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpw',
  templateUrl: './resetpw.component.html',
  styleUrls: ['./resetpw.component.css']
})
export class ResetpwComponent implements OnInit {

  exampleForm: FormGroup;
  validation_messages = {
    'uname': [
      { type: 'required', message: 'E-mail is required!' }
    ]
  };


  constructor(private ms:MyauthService, private r:Router, private fb: FormBuilder) { }

  pwReset(value){
    this.ms.ForgotPassword(value.uname);
  }

  goCancel(){
    this.r.navigateByUrl('signin');
  }

  createForm(){
    this.exampleForm = this.fb.group({
      uname: ['', Validators.required ]
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

}
