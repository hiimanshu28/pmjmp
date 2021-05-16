import { Component, OnInit, HostListener } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-national',
  templateUrl: './national.component.html',
  styleUrls: ['./national.component.css']
})
export class NationalComponent implements OnInit {
  
  cols:number;
  Nationals:Array<any>;
  innerWidth:any;
  
  @HostListener('window:resize', ['$event'])
  onResize(event){
    console.log(event.target.innerWidth)
    this.innerWidth=event.target.innerWidth;
    if(this.innerWidth >= 1360){
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
    if(this.innerWidth >= 1360){
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
    this.fs.getNationalBodys().subscribe(res=>{
      this.Nationals=res;
    });
  }

  ngOnInit(): void {
  }

}
