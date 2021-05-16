import { Component, OnInit, HostListener } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {

  zones:Array<any>;
  cols:number;
  innerWidth:any;

  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.innerWidth=event.target.innerWidth;
    if(this.innerWidth >= 1120) this.cols=3;
    else if(this.innerWidth >= 840) this.cols=2;
    else this.cols=1
  }

  constructor(public firebaseService: FirebaseService, private r:Router) {
    this.innerWidth= window.innerWidth;
    if(this.innerWidth >= 1120) this.cols=3;
    else if(this.innerWidth >= 840) this.cols=2;
    else this.cols=1
    firebaseService.getAllZones().subscribe(res=>{
      this.zones=res;
    });
  }

  goFullZone(value){
    this.firebaseService.setNid(value);
    this.r.navigateByUrl('fullzone');
  }

  ngOnInit(): void {
  }

}
