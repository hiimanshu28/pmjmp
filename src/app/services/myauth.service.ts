import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Subject } from "../../../node_modules/rxjs-compat";
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})


export class MyauthService {

  userData: any;

  signedSub: Subject<boolean> = new Subject<boolean>();
  signedBro = this.signedSub.asObservable();

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private _location: Location
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        this.signedSub.next(true);
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
        this.signedSub.next(false);
      }
    });
  }

  
  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          // this.router.navigate(['']);
          this.signedSub.next(true);
          // this._location.back();
          setTimeout(any=>{
            this.router.navigateByUrl('matrimony');}, 
            500
          );
        });
        // this.SetUserData(result.user);
        // this.signedSub.next(true);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  
  // Sign up with email/password
  SignUp(value) {
    return this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.pwd)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SetUserData(result.user, value);
        this.SendVerificationMail();

        // this.signedSub.next(true);
        // setTimeout(any=>{
        //   this.router.navigateByUrl('matrimony');}, 
        //   500
        // );
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  
  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.signedSub.next(false);
      localStorage.removeItem('user');
      // this.router.navigate(['']);
    })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verification']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
      setTimeout(cb=>{
        this.router.navigateByUrl('signin');
      }, 5000);
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
    // return (user !== null && user.emailVerified !== false) ? true : false;
  }
  
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user, value) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: value.displayName,
      photoURL: value.photoURL,
      address: value.address,
      phone: value.phone,
      dob: value.dob,
      tob: value.tob,
      pob: value.pob,
      gender: value.gender,
      caste: value.caste,
      manglik: value.manglik,
      feet: value.feet,
      inch: value.inch,
      complexion: value.complexion,
      religion: value.religion,
      equ: value.equ,
      oqu: value.oqu,
      occupation: value.occupation,
      income: value.income,
      city: value.city,
      polp: value.polp,
      smoke: value.smoke,
      drink: value.drink,
      hobbies: value.hobbies,
      delref: value.delref,
      rzpid: value.rzpid,
      date:Date.now()
    }
    return userRef.set(userData, {
      merge: true
    })
  }
}
