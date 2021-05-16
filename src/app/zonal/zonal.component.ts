import { Component, HostListener, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-zonal',
  templateUrl: './zonal.component.html',
  styleUrls: ['./zonal.component.css']
})
export class ZonalComponent implements OnInit {

  cols:number;
  President:Array<any>;
  VicePresident:Array<any>;
  Secretary:Array<any>;
  JointSecretary:Array<any>;
  Treasurer:Array<any>;
  ExecutiveMembers:Array<any>;
  MediaPrabhandan:Array<any>;
  Pro:Array<any>;
  innerWidth:any;

  @HostListener('window:resize', ['$event'])
  onResize(event){
    console.log(event.target.innerWidth)
    this.innerWidth=event.target.innerWidth;
    if(this.innerWidth >= 1400){
      this.cols=4;
    }
    else if(this.innerWidth >= 1168){
      this.cols=3;
    }
    else if(this.innerWidth >= 800){
      this.cols=2
    }
    else {
      this.cols=1;
    }
  }

  constructor(private fs:FirebaseService) {
    this.innerWidth= window.innerWidth;
    console.log(this.innerWidth);
    if(this.innerWidth >= 1400){
      this.cols=4;
    }
    else if(this.innerWidth >= 1168){
      this.cols=3;
    }
    else if(this.innerWidth >= 800){
      this.cols=2;
    }
    else {
      this.cols=1;
    }
    
    this.fs.getZonalBodys('President').subscribe(res=>{
      this.President=res;
    });
    this.fs.getZonalBodys('Vice President').subscribe(res=>{
      this.VicePresident=res;
    });
    this.fs.getZonalBodys('Secretary').subscribe(res=>{
      this.Secretary=res;
    });
    this.fs.getZonalBodys('Joint Secretary').subscribe(res=>{
      this.JointSecretary=res;
    });
    this.fs.getZonalBodys('Treasurer').subscribe(res=>{
      this.Treasurer=res;
    });
    this.fs.getZonalBodys('PRO').subscribe(res=>{
      this.Pro=res;
    });
    this.fs.getZonalBodys('Executive Members').subscribe(res=>{
      this.ExecutiveMembers=res;
    });
    this.fs.getZonalBodys('Media Prabandhan').subscribe(res=>{
      this.MediaPrabhandan=res;
    });
    
  }
  ngOnInit(): void {
  }

}
