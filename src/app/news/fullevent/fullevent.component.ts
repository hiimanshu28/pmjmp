import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fullevent',
  templateUrl: './fullevent.component.html',
  styleUrls: ['./fullevent.component.css']
})
export class FulleventComponent implements OnInit {

  nid:string='';
  event:any;

  constructor(private fs:FirebaseService, private r:Router) {
    this.nid=fs.getNid();
    this.fs.getEvent(this.nid).subscribe(res=>{
      this.event=res.payload.data();
    })
  }
  
  goNews(){
    this.r.navigateByUrl('news');
  }

  ngOnInit(): void {
  }

}
