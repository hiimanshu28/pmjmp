import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-managevideos',
  templateUrl: './managevideos.component.html',
  styleUrls: ['./managevideos.component.css']
})
export class ManagevideosComponent implements OnInit, AfterViewInit {

  create:boolean=false;
  show:boolean=false;
  displayedColumns: string[] = ['image', 'title', 'actions'];
  dataSource : MatTableDataSource<any[]>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public firebaseService: FirebaseService) {
      this.goShow();
      this.firebaseService.getAllVideos().subscribe(res =>{
        this.dataSource=new MatTableDataSource<any>(res);
        setTimeout(abc=>{
          this.dataSource.paginator = this.paginator;
          this.dataSource.paginator._intl.itemsPerPageLabel ='Videos per page:';
        }, 2000);
      });
    }

  ngOnInit(): void {
    this.createForm();
  }
  ngAfterViewInit(): void{
  }
  goCreate(){
    this.create=true;this.show=false;
  }
  goShow(){
    this.show=true;this.create=false;
  }

  exampleForm: FormGroup;
  validation_messages = {
    'vidurl': [
      { type: 'required', message: 'Video URL is required.' }
    ],
    'title': [
      { type: 'required', message: 'Video Title is required.' }
    ]
  };
  
  createForm(){
    this.exampleForm = this.fb.group({
      vidurl:['', Validators.required],
      title:['', Validators.required],
    });
  }
  
  resetFields(){
    this.exampleForm = this.fb.group({
      vidurl: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
    });
  }

  addVideo(value){
    this.firebaseService.createVideo(value).then(result=>{
      this.resetFields();
      this.goShow();
    });
  }

  goDelete(id){
    let res = confirm("Are you sure about deleting this Video?");
    if(res) this.firebaseService.deleteVideo(id);
    else return;
  }

}
