import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  
  exampleForm: FormGroup;
  email:string='';
  validation_messages = {
    'uname': [
      { type: 'required', message: 'E-mail is required!' }
    ],
    'phn': [
      { type: 'required', message: 'Phone Number is required!' }
    ]
  };

  constructor( private fb: FormBuilder, private fs:FirebaseService) {
    this.createForm();
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.email=user.email;
    }
  }

  createForm(){
    this.exampleForm = this.fb.group({
      uname: [this.email, Validators.required ],
      phn: ['', Validators.required ],
      message:['']
    });
  }
  goSubmit(value){
    this.fs.addMessage(value).then(res=>{
      alert("Message sent!");
      this.resetFields();
    });
  }
  resetFields(){
    this.exampleForm = this.fb.group({
      uname: new FormControl('', Validators.required),
      phm: new FormControl('', Validators.required),
      message: new FormControl('')
    });
  }

  goInsta(){
    window.open('https://www.instagram.com/punjabimahasanghjabalpur/', '_blank');
  }
  goFb(){
    window.open('https://www.facebook.com/Punjabi-Mahasangh-Jabalpur-102913981440418', '_blank');
  }
  goTwit(){
    window.open('https://twitter.com/PunjabiMahasang', '_blank');
  }

  ngOnInit(): void {
  }

}
