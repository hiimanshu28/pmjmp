import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-alogin',
  templateUrl: './alogin.component.html',
  styleUrls: ['./alogin.component.css']
})
export class AloginComponent implements OnInit {
  uname:string ='';
  pass:string = '';

  constructor(private r:Router, private fs: FirebaseService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.uname == 'admin' && this.pass=='pmjadmin'){ this.fs.adminLin(); this.r.navigateByUrl('adminbackend'); }
    else alert("Invalid username or password!");
  }

}
