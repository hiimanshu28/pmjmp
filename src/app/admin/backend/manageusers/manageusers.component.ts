import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
})
export class ManageusersComponent implements OnInit {

  create:boolean=false;
  show:boolean=false;
  edit:boolean=false;
  displayedColumns: string[] = ['image','blank','name', 'email', 'actions'];
  dataSource : MatTableDataSource<any[]>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

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

  constructor(
    public dialog: MatDialog, private r:Router, private fb: FormBuilder,
    public fs: FirebaseService) {
      this.fs.getUsers().subscribe(res =>{
      this.users=[];
      res.forEach(u=>{
        this.users=this.users.concat(u.payload.doc.data());
      })
      this.dataSource=new MatTableDataSource<any>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel ='Users per page:';
      });
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
  goEdit(id){
    this.fs.setNid(id);
    this.r.navigateByUrl('editprofile');
  }
  goView(id){
    this.fs.setNid(id);
    setTimeout(cb=>{
      this.r.navigateByUrl('fullprofile');
    }, 300);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

}
