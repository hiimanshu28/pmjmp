import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fullprofile',
  templateUrl: './fullprofile.component.html',
  styleUrls: ['./fullprofile.component.css']
})
export class FullprofileComponent implements OnInit {

  uid:any;
  user:any;
  constructor(private fs:FirebaseService, private _location: Location, private r:Router) { 
    this.uid=fs.getNid();
    this.fs.getUser(this.uid).subscribe(usr=>{
      this.user=usr.payload.data();
    });
  }
  
  goFullpic(){
    this.fs.setUrl(this.user['photoURL']);
    setTimeout(() => {
      this.r.navigateByUrl('fullpic');
    }, 300);
  }

  goBack(){
    this._location.back();
  }

  ngOnInit(): void {
  }

}
