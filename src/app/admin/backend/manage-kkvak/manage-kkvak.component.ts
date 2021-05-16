import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-manage-kkvak',
  templateUrl: './manage-kkvak.component.html',
  styleUrls: ['./manage-kkvak.component.css']
})
export class ManageKkvakComponent implements OnInit {

  create:boolean=false;
  show:boolean=false;
  edit:boolean=false;
  video:boolean=false;
  displayedColumns: string[] = ['title', 'actions'];
  dataSource : MatTableDataSource<any[]>;
  displayedColumns2: string[] = ['image', 'blank', 'actions'];
  dataSource2 : MatTableDataSource<any[]>;
  
  @ViewChild('vak', {read: MatPaginator}) paginator1: MatPaginator;

  @ViewChild('vid', {read: MatPaginator}) paginator2: MatPaginator;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public firebaseService: FirebaseService
    ){
    this.goShow();
  }

  ngOnInit(): void {
    this.createForm();
  }
  
  goCreate(){
    this.show=false;this.edit=false;this.video=false;
    this.create=true;
  }
  goShow(){
    this.firebaseService.getAllKkvaks().subscribe(res =>{
      this.dataSource=new MatTableDataSource<any>(res);
      this.dataSource.paginator = this.paginator1;
    });
    this.firebaseService.getAllKkvids().subscribe(res =>{
      this.dataSource2=new MatTableDataSource<any>(res);
      this.dataSource2.paginator = this.paginator2;
      this.dataSource2.paginator._intl.itemsPerPageLabel ='Videos per page:';
    });
    this.create=false;this.edit=false;this.video=false;
    this.show=true;
    this.id='';
  }
  goEdit(id){
    this.id=id;
    this.show=false;this.video=false;
    this.edit=true;
    this.firebaseService.getKkvak(id).subscribe(res=>{
      this.exampleForm.patchValue({
        title: res.payload.data()['title'],
        para1: res.payload.data()['para1'],
        para2: res.payload.data()['para2'],
        para3: res.payload.data()['para3'],
        author: res.payload.data()['author']
      })
    });
  }
  goVideo(){
    this.create=false;this.show=false;this.edit=false;
    this.video=true;
  }


  exampleForm: FormGroup;
  validation_messages = {
    'title': [
      { type: 'required', message: 'Title is required.' }
    ],
    'para1': [
      { type: 'required', message: 'Paragraph 1 is required.' }
    ],
    'author': [
      { type: 'required', message: 'Author is required.' }
    ]
  };
  exampleForm2: FormGroup;
  validation_messages2 = {
    'vidurl': [
      { type: 'required', message: 'Video URL is required.' }
    ]
  };
  
  createForm(){
    this.exampleForm = this.fb.group({
      title: ['', Validators.required],
      para1:['', Validators.required],
      para2:[''],
      para3:[''],
      author:['', Validators.required],
      delref:''
    });
    this.exampleForm2 = this.fb.group({
      vidurl:['', Validators.required]
    });
  }
  
  resetFields(){
    this.exampleForm = this.fb.group({
      title: new FormControl('', Validators.required),
      para1: new FormControl('', Validators.required),
      para2: new FormControl(''),
      para3: new FormControl(''),
      author: new FormControl('', Validators.required)
    });
    this.exampleForm2 = this.fb.group({
      vidurl: new FormControl('', Validators.required)
    });
  }

  
  createKkvak(value){
    this.firebaseService.createKkvak(value);
    this.resetFields();
    this.goShow();
  }

  id:string;

  updateKkvak(value){
    this.firebaseService.updateKkvak(this.id, value);
    this.goShow();
  }

  goDelete(id){
    let res = confirm("Are you sure about deleting this Vaktavya?");
    if(res) this.firebaseService.deleteKkvak(id);
    else return;
  }
  
  addVideo(value){
    this.firebaseService.createKkvid(value).then(result=>{
      this.resetFields();
      this.goShow();
    });
  }

  goDeleteVid(id){
    let res = confirm("Are you sure about deleting this Video?");
    if(res) this.firebaseService.deleteKkvid(id);
    else return;
  }

}
