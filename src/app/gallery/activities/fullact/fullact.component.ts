import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fullact',
  templateUrl: './fullact.component.html',
  styleUrls: ['./fullact.component.css']
})
export class FullactComponent implements OnInit {

  nid:string='';
  act:any;

  constructor(private fs:FirebaseService, private r:Router) {
    this.nid=fs.getNid();
    this.fs.getActivity(this.nid).subscribe(res=>{
      this.act=res.payload.data();
    })
  }
  
  goNews(){
    this.r.navigateByUrl('activities');
  }

  ngOnInit(): void {
  }

}
