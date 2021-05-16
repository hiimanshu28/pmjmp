import { Component, OnInit, HostListener } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  cols:number;
  GoverningBody:Array<any>;
  SanrakshakSadasya:Array<any>;
  President:Array<any>;
  VicePresident:Array<any>;
  Secretary:Array<any>;
  JointSecretary:Array<any>;
  Treasurer:Array<any>;
  MahilaSamiti:Array<any>;
  Pro:Array<any>;
  ExecutiveMembers:Array<any>;
  AnushashanSamiti:Array<any>;
  SadasyataVikasSamiti:Array<any>;
  MediaPrabhandan:Array<any>;
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
    
    this.fs.getGoverningBodys().subscribe(res=>{
      this.GoverningBody=res;
    });
    this.fs.getSanrakshakSadasyas().subscribe(res=>{
      this.SanrakshakSadasya=res;
    });
    this.fs.getPresidents().subscribe(res=>{
      this.President=res;
    });
    this.fs.getVicePresidents().subscribe(res=>{
      this.VicePresident=res;
    });
    this.fs.getSecretarys().subscribe(res=>{
      this.Secretary=res;
    });
    this.fs.getJointSecretarys().subscribe(res=>{
      this.JointSecretary=res;
    });
    this.fs.getTreasurers().subscribe(res=>{
      this.Treasurer=res;
    });
    this.fs.getMahilaSamitis().subscribe(res=>{
      this.MahilaSamiti=res;
    });
    this.fs.getPros().subscribe(res=>{
      this.Pro=res;
    });
    this.fs.getExecutiveMemberss().subscribe(res=>{
      this.ExecutiveMembers=res;
    });
    this.fs.getAnushashanSamitis().subscribe(res=>{
      this.AnushashanSamiti=res;
    });
    this.fs.getMediaPrabhandans().subscribe(res=>{
      this.MediaPrabhandan=res;
    });
    
  }

  ngOnInit(): void {
  }

}
