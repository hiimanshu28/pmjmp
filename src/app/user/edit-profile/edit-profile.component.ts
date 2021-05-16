import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  exampleForm: FormGroup;
  genders:string[]=['Male', 'Female'];
  validation_messages = {
    'displayName': [
      { type: 'required', message: 'Full Name is required!' }
    ],
    'dob': [
      { type: 'required', message: 'Date of birth is required!' }
    ],
    'tob': [
      { type: 'required', message: 'Time of birth is required!' }
    ],
    'pob': [
      { type: 'required', message: 'Place of birth is required!' }
    ],
    'gender': [
      { type: 'required', message: 'Gender is required!' }
    ],
    'manglik': [
      { type: 'required', message: 'This field is required!' }
    ],
    'height': [
      { type: 'required', message: 'Height is required!' }
    ],
    'caste': [
      { type: 'required', message: 'Caste is required!' }
    ],
    'religion': [
      { type: 'required', message: 'Religion is required!' }
    ],
    'complexion': [
      { type: 'required', message: 'Complexion is required!' }
    ],
    'equ': [
      { type: 'required', message: 'Educational Qualification is required!' }
    ],
    'occupation': [
      { type: 'required', message: 'Occupation is required!' }
    ],
    'income': [
      { type: 'required', message: 'Income is required!' }
    ],
    'city': [
      { type: 'required', message: 'Current city of residence is required!' }
    ],
    'phone': [
      { type: 'required', message: 'Phone No. is required!' }
    ],
    'polp': [
      { type: 'required', message: 'Preference is required!' }
    ],
    'smoke': [
      { type: 'required', message: 'Please answer Yes or No!' }
    ],
    'drink': [
      { type: 'required', message: 'Please answer Yes or No!' }
    ],
    'hobbies': [
      { type: 'required', message: 'Please tell your Hobbies!' }
    ],
    'membership': [
      { type: 'required', message: 'Membership is required!' }
    ],
    'address': [
      { type: 'required', message: 'Address is required!' }
    ]
  };
  showprog: boolean=false;


  constructor(private router:Router, private fb: FormBuilder, 
    private afs: AngularFireStorage, private fs:FirebaseService) {
      // let u = JSON.parse(localStorage.getItem('user'));
      // this.fs.getUser(u.uid).subscribe(usr=>{
        let u = this.fs.getNid();
        this.fs.getUser(u).subscribe(usr=>{
        let data=usr.payload.data();
        this.uid=data['uid'];
        this.url=data['photoURL'];
        this.imgUploaded=true;
        this.exampleForm.patchValue({
          photoURL: data['photoURL'],
          displayName: data['displayName'],
          address: data['address'],
          phone: data['phone'],
          dob: data['dob'],
          tob: data['tob'],
          pob: data['pob'],
          gender: data['gender'],
          caste: data['caste'],
          manglik: data['manglik'],
          feet: data['feet'],
          inch: data['inch'],
          complexion: data['complexion'],
          religion: data['religion'],
          equ: data['equ'],
          oqu: data['oqu'],
          occupation: data['occupation'],
          income: data['income'],
          city: data['city'],
          polp: data['polp'],
          smoke: data['smoke'],
          drink: data['drink'],
          hobbies: data['hobbies'],
          delref: data['delref'],
        })
      })
     }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.exampleForm = this.fb.group({
      photoURL: ['', Validators.required ],
      displayName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['',Validators.required],
      dob: [,Validators.required],
      tob: [,Validators.required],
      pob: [,Validators.required],
      gender: ['', Validators.required],
      caste: ['', Validators.required],
      manglik: ['', Validators.required],
      feet: [, Validators.required],
      inch: [],
      complexion: ['', Validators.required],
      religion: ['', Validators.required],
      equ: ['', Validators.required],
      oqu: [''],
      occupation: ['', Validators.required],
      income: ['', Validators.required],
      city: ['', Validators.required],
      polp: ['', Validators.required],
      smoke: ['', Validators.required],
      drink: ['', Validators.required],
      hobbies: ['', Validators.required],
      delref: ''
    });
  }

  uid:string='';
  updateProfile(value){
    if(this.previmg){
      let ref: AngularFireStorageReference = this.afs.ref(this.previmg);
      ref.delete();
      this.previmg='';
    }
    this.nextimg='';
    this.fs.updateUser(this.uid, value).then(res=>{
      this.router.navigateByUrl('adminbackend/users');
    });
  }
  goBack(){
    this.previmg='';
    if(this.nextimg){
      let ref: AngularFireStorageReference = this.afs.ref(this.nextimg);
      ref.delete();
      this.nextimg='';
    }
    this.router.navigateByUrl('adminbackend/users');
  }

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  url:string;
  imgUploaded:boolean=false;
  progress=0;
  previmg:string='';
  nextimg:string='';
  upload(event){
    this.fs.getUser(this.uid).subscribe(res=>{
      this.previmg=res.payload.data()['delref'];
    })
    if(this.nextimg){
      let ref: AngularFireStorageReference = this.afs.ref(this.nextimg);
      ref.delete();
      this.nextimg='';
    }
    this.showprog=true;
    this.nextimg= Math.random().toString(36).substring(2);
    this.ref=this.afs.ref(this.nextimg);
    this.exampleForm.patchValue({
      delref: this.nextimg
    });
    this.ref.put(event.target.files[0])
    .then(snapshot=>{
      snapshot.ref.getDownloadURL().then(result=>{
        this.url=result;
        this.exampleForm.patchValue({
          photoURL: result
        });
        this.imgUploaded=true;
        this.showprog=false;
      })
    })
    .catch(err=>{
      alert(err)
    })
  }

}
