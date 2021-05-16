import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fullnews',
  templateUrl: './fullnews.component.html',
  styleUrls: ['./fullnews.component.css']
})
export class FullnewsComponent implements OnInit {

  nid:string='';
  news:any;

  constructor(private fs:FirebaseService, private r:Router) {
    this.nid=fs.getNid();
    this.fs.getNews(this.nid).subscribe(res=>{
      this.news=res.payload.data();
    })
  }
  
  goNews(){
    this.r.navigateByUrl('news');
  }

  ngOnInit(): void {
  }

}
