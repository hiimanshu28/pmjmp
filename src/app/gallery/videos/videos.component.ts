import { Component, OnInit, HostListener } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  videos:Array<any>;
  cols:number;
  innerWidth:any;

  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.innerWidth=event.target.innerWidth;
    if(this.innerWidth >= 1120) this.cols=3;
    else if(this.innerWidth >= 840) this.cols=2;
    else this.cols=1
  }

  constructor(public firebaseService: FirebaseService) {
    this.innerWidth= window.innerWidth;
    if(this.innerWidth >= 1120) this.cols=3;
    else if(this.innerWidth >= 840) this.cols=2;
    else this.cols=1
    firebaseService.getAllVideos().subscribe(res=>{
      this.videos=res;
    })
   }

  ngOnInit(): void {
  }

}
