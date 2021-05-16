import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-full-kkvak',
  templateUrl: './full-kkvak.component.html',
  styleUrls: ['./full-kkvak.component.css']
})
export class FullKkvakComponent implements OnInit {

  nid:string='';
  kkvak:any;

  constructor(private fs:FirebaseService, private r:Router) {
    this.nid=fs.getNid();
    this.fs.getKkvak(this.nid).subscribe(res=>{
      this.kkvak=res.payload.data();
    })
  }
  
  goNews(){
    this.r.navigateByUrl('kkvak');
  }

  ngOnInit(): void {
  }

}
