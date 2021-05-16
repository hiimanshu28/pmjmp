import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fullpic',
  templateUrl: './fullpic.component.html',
  styleUrls: ['./fullpic.component.css']
})
export class FullpicComponent implements OnInit {

  picUrl:string='';

  constructor(private fs: FirebaseService, private _location: Location) {
    this.picUrl=this.fs.getUrl();
  }

  goBack(){
    this._location.back();
  }

  ngOnInit(): void {
  }

}
