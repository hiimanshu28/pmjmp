import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-full-member-details',
  templateUrl: './full-member-details.component.html',
  styleUrls: ['./full-member-details.component.css']
})
export class FullMemberDetailsComponent implements OnInit {

  uid:string;
  member:any;

  constructor(private fs:FirebaseService, private r:Router) {
    this.uid=this.fs.getNid();
    fs.getnewMember(this.uid).subscribe(res=>{
      this.member=res.payload.data();
      console.log(this.member);
    })
  }
  
  goBack(){
    this.r.navigateByUrl('adminbackend/newmember');
  }

  ngOnInit(): void {
  }

}
