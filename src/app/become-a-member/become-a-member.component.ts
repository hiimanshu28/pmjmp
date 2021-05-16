import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { environment } from 'src/environments/environment';
import { WindowRef } from '../windowRef.service';

@Component({
  selector: 'app-become-a-member',
  templateUrl: './become-a-member.component.html',
  styleUrls: ['./become-a-member.component.css']
})
export class BecomeAMemberComponent implements OnInit {

  exampleForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private fs:FirebaseService, 
    private router:Router, 
    private afs: AngularFireStorage,
    private winRef: WindowRef) {
    this.createForm();
  }
  
  createForm(){
    this.exampleForm = this.fb.group({
      icard: [''],
      sadasyata: [''],
      blood:[''],
      name: ['', Validators.required ],
      pita: ['', Validators.required ],
      pata: ['', Validators.required ],
      pin: ['', Validators.required ],
      dob: ['', Validators.required ],
      dom: [''],
      pob: ['', Validators.required ],
      nagrikta: ['', Validators.required ],
      siksha: ['', Validators.required ],
      vyavsay: ['', Validators.required ],
      pratisthan: [''],
      pad: [''],
      uplabdhta: [''],
      mobile: ['', Validators.required ],
      phone: [''],
      email: ['', Validators.required ],
      fb: [''],
      tw: [''],
      in: [''],
      ruchi: [''],
      yogyata: [''],
      pita2: [''],
      pso: [''],
      pdb: [''],
      mata: [''],
      mdo: [''],
      mdb: [''],
      spouse: [''],
      ssodo: [''],
      sdb: [''],
      bhai1: [''],
      bm1: [''],
      bdb1: [''],
      bhai2: [''],
      bm2: [''],
      bdb2: [''],
      bhai3: [''],
      bm3: [''],
      bdb3: [''],
      bhai4: [''],
      bm4: [''],
      bdb4: [''],
      putra1: [''],
      pm1: [''],
      pdb1: [''],
      putra2: [''],
      pm2: [''],
      pdb2: [''],
      putra3: [''],
      pm3: [''],
      pdb3: [''],
      putra4: [''],
      pm4: [''],
      pdb4: [''],
      sthan: ['', Validators.required ],
      jila: ['', Validators.required ],
      rajya: ['', Validators.required ],
      vibhajan: [''],
      parichaykarta: [''],
      pmno: [''],
      pem: [''],
      dname: ['', Validators.required ],
      dpita: ['', Validators.required ],
      daddr: ['', Validators.required ],
      date: Date.now(),
      photoURL: ['', Validators.required ],
      delref: [''],
      rzpid: ''
    });
  }

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  url:string;
  imgUploaded:boolean=false;
  showprog: boolean=false;
  nextimg:string='';
  upload(event){
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

  goSubmit(value){
    this.fs.createNewMember(value).then(cb=>{
      alert("Your application has been submitted successfully!");
    });
  }

  //payment gateway method simple
  
  payid:'string';

  razorPayHimanshu(value){ 
    let options:any = {
        "key": environment.RAZORPAY_KEY_ID,
        "amount": 510000,
        "name": "Paying to",
        "description": "Punjabi Mahasangh Jabalpur",
        // "handler": function (response){
        //   alert(response.razorpay_payment_id);
        //   this.payid=response.razorpay_payment_id;
        //   this.fs.newOrder(this.uid, this.pid, this.plan.price, this.payid);
        //   this.router.navigateByUrl('orders');
        //  },

        "prefill": {
          "name": value.displayName,
          "contact": value.phone,
          "email": value.email
        },
        "theme": {
          "color": "#F66806"
        }
      };

      // let options2 = {
      //   amount: 100,  // amount in the smallest currency unit
      //   currency: "INR",
      //   receipt: "order_rcptid_11",
      //   payment_capture: '1'
      // };

      options.handler = ((response) => {
          this.payid=response.razorpay_payment_id;
          this.exampleForm.patchValue({rzpid: this.payid});
          this.goSubmit(value);
      });

      let rzp1 = new this.winRef.nativeWindow.Razorpay(options);
      rzp1.open();
      rzp1.on('payment.failed', (response) => {
        alert(response.error.description);
        console.log(response.error);
      });
  }
  

  ngOnInit(): void {
  }

}
