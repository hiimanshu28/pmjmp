import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fullzone',
  templateUrl: './fullzone.component.html',
  styleUrls: ['./fullzone.component.css']
})
export class FullzoneComponent implements OnInit {

  nid:string='';
  act:any;

  constructor(private fs:FirebaseService, private r:Router) {
    this.nid=fs.getNid();
    this.fs.getZone(this.nid).subscribe(res=>{
      this.act=res.payload.data();
    })
  }
  
  goNews(){
    this.r.navigateByUrl('zones');
  }

  ngOnInit(): void {
  }

}
