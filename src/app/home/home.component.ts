import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig] 
})
export class HomeComponent implements OnInit {

  indicators:boolean=false;
  images: string[];
  images2: string[];
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  paused = false;
  pauseOnHover = false;
  ind:boolean=false;
  arrows:boolean=false;

  cols:number;
  ads:Array<any>;
  lnews:Array<any>;
  levents:Array<any>;
  lacts:Array<any>;
  lvacs:Array<any>;
  innerWidth:any;
  small:boolean=false;
  centerads:Array<any>;

  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.innerWidth=event.target.innerWidth;
    if(this.innerWidth >= 1120) {this.cols=3; this.small=false;}
    else if(this.innerWidth >= 840) {this.cols=2; this.small=false;}
    else {this.cols=1; this.small=true;}
  }

  constructor(carousel: NgbCarouselConfig, private fs:FirebaseService, private r:Router) {
    carousel.interval=6000;
    carousel.wrap=true;
    this.images=["../../assets/banners/b1.jpg", "../../assets/banners/b2.jpg", "../../assets/banners/b3.jpg", "../../assets/banners/b4.jpg", "../../assets/banners/b5.jpg"];
    // this.images2=["../../assets/tallad1.jpg","../../assets/tallad2.jpg","../../assets/tallad3.jpg"]
    this.innerWidth= window.innerWidth;
    if(this.innerWidth >= 1120) {this.cols=3; this.small=false;}
    else if(this.innerWidth >= 840) {this.cols=2; this.small=false;}
    else {this.cols=1; this.small=true;}
    this.fs.getCenterAds().subscribe(res=>{
      this.ads=res;
    });
    this.fs.getTallAds().subscribe(res=>{
      this.images2=[];
      res.forEach(cb =>{
        this.images2=this.images2.concat(cb.payload.doc.data()['imgurl']);
      })
    });
    this.fs.getCenterAds().subscribe(res=>{
      this.centerads=[];
      res.forEach(ad=>{
        this.centerads = this.centerads.concat(ad.payload.doc.data());
      });
    });
    this.fs.getLatestNews().subscribe(res=>{
      this.lnews=[];
      res.forEach(ne =>{
        this.lnews=this.lnews.concat(ne.payload.doc.data()['headline']);
      })
    });
    this.fs.getLatestEvents().subscribe(res=>{
      this.levents=[];
      res.forEach(ev=>{
        this.levents=this.levents.concat(ev.payload.doc.data()['title']);
      })
    });
    this.fs.getLatestActivities().subscribe(res=>{
      this.lacts=[];
      res.forEach(ac=>{
        this.lacts=this.lacts.concat(ac.payload.doc.data()['title']);
      })
    });
    this.fs.getLatestKkvaks().subscribe(res=>{
      this.lvacs=[];
      res.forEach(ac=>{
        this.lvacs=this.lvacs.concat(ac.payload.doc.data()['title']);
      })
    });
  }

  goNews(){
    this.r.navigateByUrl('news');
  }
  goActivities(){
    this.r.navigateByUrl('activities');
  }
  goKkvak(){
    this.r.navigateByUrl('kkvak');
  }

  ngOnInit(): void {
    
  }
}
