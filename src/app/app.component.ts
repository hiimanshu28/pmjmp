import { Component, ViewChild, HostListener } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  title = 'Punjabi Mahasangh Jabalpur';
  images=[];
  ind:boolean=false;
  arrows:boolean=false;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  
  innerWidth:any;
  small:boolean=false;
  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.innerWidth=event.target.innerWidth;
    if(this.innerWidth<800){
      this.small=true;
    }
    else this.small=false;
  }

  footerads:Array<any>;

  constructor(private r:Router, carousel: NgbCarouselConfig, private fs:FirebaseService ){
    this.innerWidth= window.innerWidth;
    if(this.innerWidth<800){
      this.small=true;
    }
    else this.small=false;
    carousel.interval=5000;
    carousel.wrap=true;
    this.fs.getFooterAds().subscribe(res=>{
      this.footerads=[];
      res.forEach(ad=>{
        this.footerads = this.footerads.concat(ad.payload.doc.data());
      });
    })
  }

  goHome(){
    this.r.navigateByUrl('');
  }
  goZonal(){
    this.r.navigateByUrl('zonalbody');
  }
  goNational(){
    this.r.navigateByUrl('nationalbody');
  }
  goDirectory(){
    this.r.navigateByUrl('directory');
  }
  goAbout(){
    this.r.navigateByUrl('about');
  }
  goZones(){
    this.r.navigateByUrl('zones');
  }
  goDonations(){
    this.r.navigateByUrl('donations');
  }
  goContact(){
    this.r.navigateByUrl('contact');
  }
  goPhotos(){
    this.r.navigateByUrl('photos');
  }
  goVideos(){
    this.r.navigateByUrl('videos');
  }
  goMember(){
    this.r.navigateByUrl('become-a-member');
  }
  goActivities(){
    this.r.navigateByUrl('activities');
  }
  goMatrimony(){
    this.r.navigateByUrl('matrimony');
  }
  goNews(){
    this.r.navigateByUrl('news');
  }

}
