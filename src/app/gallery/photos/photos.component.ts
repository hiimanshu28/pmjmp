import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  photos:Array<any>;
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
    firebaseService.getAllPhotos().subscribe(res=>{
      this.photos=res;
    })
  }

  enLarge(src){
    this.firebaseService.setUrl(src);
    this.r.navigateByUrl('fullpic');
  }

  ngOnInit(): void {
  }

}
