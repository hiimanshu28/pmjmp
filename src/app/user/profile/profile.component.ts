import { Component, OnInit, ViewChild } from '@angular/core';
import { MyauthService } from 'src/app/services/myauth.service';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any;
  displayedColumns: string[] = ['photo', 'name', 'gender','complexion', 'height', 'religion', 'unlock'];
  dataSource : MatTableDataSource<any[]>;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  users:any[]=[];

  religions:string[]=['Hindu', 'Sikh', 'Punjabi'];
  mangliks:string[]=['Manglik', 'Non-Manglik'];
  complexions:string[]=['Fair', 'Very Fair', 'Wheatish', 'Dark', 'Very Dark'];
  exampleForm: FormGroup;

  validation_messages = {
    'religion': [
      { type: 'required', message: 'Required!' }
    ],
    'complexion': [
      { type: 'required', message: 'Required!' }
    ],
    'manglik': [
      { type: 'required', message: 'Required!' }
    ]
  }

  constructor(private as:MyauthService, private fs:FirebaseService, private r:Router,
    private fb: FormBuilder ) {
    let usr = JSON.parse(localStorage.getItem('user'));
    let uid= usr.uid;
    this.fs.getUser(uid).subscribe(res =>{
      this.user=res.payload.data();
    });
    this.fs.getUsers().subscribe(usrs =>{
      this.users=[];
      usrs.forEach(el=>{
        this.users=this.users.concat(el.payload.doc.data());
      });
      this.dataSource=new MatTableDataSource<any>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel ='Users per page:';
    });
  }

  filterUsers(value){
    this.users=[];
    this.fs.getFilteredUsers(value).subscribe(usrs =>{
      usrs.forEach(el=>{
        this.users=this.users.concat(el.payload.doc.data());
      });
      this.dataSource=new MatTableDataSource<any>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel ='Users per page:';
    })
  }
  resetFilters(){
    this.users=[];
    this.fs.getUsers().subscribe(usrs =>{
      usrs.forEach(el=>{
        this.users=this.users.concat(el.payload.doc.data());
      });
      this.dataSource=new MatTableDataSource<any>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel ='Users per page:';
    })
  }

  goFullpic(){
    this.fs.setUrl(this.user['photoURL']);
    setTimeout(() => {
      this.r.navigateByUrl('fullpic');
    }, 300);
  }

  viewProfile(uid){
    this.fs.setNid(uid);
    setTimeout(cb=>{
      this.r.navigateByUrl('fullprofile');
    }, 300);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  logOut(){
    this.as.SignOut().then(r=>{
      this.r.navigateByUrl('');
    });
  }
  goEditprofile(){
    this.r.navigateByUrl('editprofile');
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.exampleForm = this.fb.group({
      religion: ['', Validators.required ],
      complexion: ['', Validators.required ],
      manglik: ['', Validators.required ]
    });
  }

}
