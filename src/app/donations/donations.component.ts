import { Component, OnInit, HostListener  } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {

  donators:Array<any>;
  cols:number;
  innerWidth:any;

  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.innerWidth=event.target.innerWidth;
    console.log(this.innerWidth)
    if(this.innerWidth >= 1400){
      this.cols=3;
    }
    else if(this.innerWidth >= 1168){
      this.cols=2;
    }
    else {
      this.cols=1;
    }
  }

  constructor(private fs:FirebaseService) {
    this.innerWidth= window.innerWidth;
    if(this.innerWidth >= 1400){
      this.cols=3;
    }
    else if(this.innerWidth >= 1168){
      this.cols=2;
    }
    else {
      this.cols=1;
    }
    this.fs.getAllDonations().subscribe(res=>{
      this.donators=res;
    });
  }

  
  goDonate(){
    window.open('https://www.instamojo.com/@punjabimahasanghjabalpur/', '_blank');
  }

  ngOnInit(): void {
  }

}
