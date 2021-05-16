import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MyauthService } from 'src/app/services/myauth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { PaymentService } from 'src/app/payment.service';
import { environment } from 'src/environments/environment';
import { FirebaseService } from 'src/app/services/firebase.service';
import { WindowRef } from 'src/app/windowRef.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  exampleForm: FormGroup;
  memberships:string[]= ['Life Member', 'Non Member'];
  genders:string[]=['Male', 'Female'];
  religions:string[]=['Hindu', 'Sikh', 'Punjabi'];
  mangliks:string[]=['Manglik', 'Non-Manglik'];
  complexions:string[]=['Fair', 'Very Fair', 'Wheatish', 'Dark', 'Very Dark'];
  validation_messages = {
    'email': [
      { type: 'required', message: 'E-mail is required!' }
    ],
    'pwd': [
      { type: 'required', message: 'Password is required!' }
    ],
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
    'address': [
      { type: 'required', message: 'Address is required!' }
    ]
  };

  constructor(
    private myauth:MyauthService, 
    private router:Router, 
    private fb: FormBuilder, 
    private afs: AngularFireStorage,
    private paymentService: PaymentService,
    private fs:FirebaseService,
    private winRef: WindowRef,
    private changeRef: ChangeDetectorRef) {

  }
    
  signUp(value){
    this.nextimg='';
    this.myauth.SignUp(value);
  }

  regWithPassword(password, value){
    if(password=='Punj@b1M@h@s@ngh') this.signUp(value);
    else alert("Incorrect Password");
  }

  //payment gateway method simple
  
  payid:'string';

  razorPayHimanshu(value){ 
    let options:any = {
        "key": environment.RAZORPAY_KEY_ID,
        "amount": 210000,
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
          this.signUp(value);
      });

      let rzp1 = new this.winRef.nativeWindow.Razorpay(options);
      rzp1.open();
      rzp1.on('payment.failed', (response) => {
        alert(response.error.description);
        console.log(response.error);
      });
  }
  



  //Payment Gateway Integration with cloud functions
  processingPayment: boolean;
  payableAmount = 0;
  WindowRef: any;
  paymentResponse:any = {};
  paid:boolean=false;
  
  proceedToPay($event) {
    this.processingPayment = true;
    this.payableAmount =  210000 ;
    this.initiatePaymentModal($event);
  }


  initiatePaymentModal(event) {

    let receiptNumber = `Receipt#${Math.floor(Math.random() * 5123 * 43) + 10}`;
    
    let orderDetails = {
      amount: this.payableAmount,
      receipt: receiptNumber
    }

    this.paymentService.createOrder(orderDetails)
        .subscribe(order => {
        console.log("TCL: CheckoutComponent -> initiatePaymentModal -> order", order)
          var rzp1 = new this.WindowRef.Razorpay(this.preparePaymentDetails(order));
          this.processingPayment = false;
          rzp1.open(); 
          event.preventDefault();
        }, error => {
        console.log("TCL: CheckoutComponent -> initiatePaymentModal -> error", error)

        })

   }


   preparePaymentDetails(order){

    var ref = this;
    return  {
      "key": environment.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      "amount": this.payableAmount, // Amount is in currency subunits. Default currency is INR. Hence, 29935 refers to 29935 paise or INR 299.35.
      "name": 'Pay',
      "currency": order.currency,
      "order_id": order.id,//This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
      "image": 'https://angular.io/assets/images/logos/angular/angular.png',
      "handler": function (response){
        ref.handlePayment(response);
      },
      "prefill": {
          "name": `Angular Geeks`
      },
      "theme": {
          "color": "#2874f0"
      }
     };
   }

   handlePayment(response) {

    this.paymentService.capturePayment({
      amount: this.payableAmount,
      payment_id: response.razorpay_payment_id
    })
      .subscribe(res => {
        this.paymentResponse = res;
        this.changeRef.detectChanges();
        this.paid=true;
       },
      error => {
        this.paymentResponse = error;
      });
  }


  goSignIn(){
    this.createForm();
    if(this.nextimg){
      let ref: AngularFireStorageReference = this.afs.ref(this.nextimg);
      ref.delete();
      this.nextimg='';
    }
    this.router.navigateByUrl('signin');
  }

  ngOnInit(): void {
    this.createForm();
  }
  
  createForm(){
    this.exampleForm = this.fb.group({
      email: ['', Validators.required ],
      pwd: ['', Validators.required ],
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
      delref: '',
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
      console.log(err)
    })
  }

}
