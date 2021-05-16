import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-manageactivities',
  templateUrl: './manageactivities.component.html',
  styleUrls: ['./manageactivities.component.css']
})
export class ManageactivitiesComponent implements OnInit {

  create:boolean=false;
  show:boolean=false;
  edit:boolean=false;
  displayedColumns: string[] = ['image','blank','title', 'actions'];
  dataSource : MatTableDataSource<any[]>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public firebaseService: FirebaseService,
    private afs: AngularFireStorage
    ){
    this.goShow();
  }

  ngOnInit(): void {
    this.createForm();
  }
  
  goCreate(){
    this.create=true;this.show=false;this.edit=false;this.url='';
  }
  goShow(){
    this.firebaseService.getAllActivities().subscribe(res =>{
    this.dataSource=new MatTableDataSource<any>(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel ='Activities per page:';
    });
    this.show=true;this.create=false;this.edit=false;
    this.id='';
    this.previmg='';
    this.resetFields();
    if(this.nextimg){
      let ref: AngularFireStorageReference = this.afs.ref(this.nextimg);
      ref.delete();
      this.nextimg='';
    }
  }
  
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  url:string;
  imgUploaded:boolean=false;
  progress=0;
  showprog:boolean=false;

  exampleForm: FormGroup;
  validation_messages = {
    'title': [
      { type: 'required', message: 'Event Title is required.' }
    ],
    'description': [
      { type: 'required', message: 'Description is required.' }
    ]
  };
  
  createForm(){
    this.exampleForm = this.fb.group({
      title: ['', Validators.required],
      imgurl:['', Validators.required],
      description:['', Validators.required],
      delref:''
    });
  }
  
  resetFields(){
    this.exampleForm = this.fb.group({
      title: new FormControl('', Validators.required),
      imgurl: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      delref: new FormControl('')
    });
  }

  previmg:string='';
  nextimg:string='';
  upload(event){
    if(this.id){
      this.firebaseService.getActivity(this.id).subscribe(ad=>{
        this.previmg=ad.payload.data()['delref'];
      });
    }
    if(this.nextimg){
      let ref: AngularFireStorageReference = this.afs.ref(this.nextimg);
      ref.delete();
      this.nextimg='';
    }
    this.showprog=true;
    this.nextimg= Math.random().toString(36).substring(2);
    this.ref=this.afs.ref(this.nextimg);
    this.exampleForm.patchValue({
      delref: this.nextimg
    });
    this.ref.put(event.target.files[0])
    .then(snapshot=>{
      snapshot.ref.getDownloadURL().then(result=>{
        this.url=result;
        this.exampleForm.patchValue({
          imgurl: result
        });
        this.imgUploaded=true;
        this.showprog=false;
      })
    })
    .catch(err=>{
      alert(err)
    })
  }

  createActivity(value){
    this.firebaseService.createActivity(value);
    this.resetFields();
    this.nextimg='';
    this.goShow();
  }

  id:string;

  updateActivity(value){
    if(this.previmg){
      let ref: AngularFireStorageReference = this.afs.ref(this.previmg);
      ref.delete();
      this.previmg='';
    }
    this.nextimg='';
    this.firebaseService.updateActivity(this.id, value);
    this.goShow();
  }

  goEdit(id){
    this.id=id;
    this.edit=true; this.show=false;
    this.firebaseService.getActivity(id).subscribe(res=>{
      this.exampleForm.patchValue({
        title: res.payload.data()['title'],
        imgurl: res.payload.data()['imgurl'],
        delref: res.payload.data()['delref'],
        description: res.payload.data()['description']
      })
      this.url=res.payload.data()['imgurl'];
    });
  }
  goDelete(id){
    let res = confirm("Are you sure about deleting this Activity?");
    if(res) this.firebaseService.deleteActivity(id);
    else return;
  }

}
