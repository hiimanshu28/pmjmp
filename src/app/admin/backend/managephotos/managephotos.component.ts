import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-managephotos',
  templateUrl: './managephotos.component.html',
  styleUrls: ['./managephotos.component.css']
})
export class ManagephotosComponent implements OnInit {

  create:boolean=false;
  show:boolean=false;
  edit:boolean=false;
  displayedColumns: string[] = ['image', 'title', 'actions'];
  dataSource : MatTableDataSource<any[]>;

  validation_messages = {
    'title': [
      { type: 'required', message: 'Photo Title is required.' }
    ]
  };
  
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
    this.firebaseService.getAllPhotos().subscribe(res =>{
    this.dataSource=new MatTableDataSource<any>(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel ='Photos per page:';
    });
    this.show=true;this.create=false;this.edit=false;
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
  
  createForm(){
    this.exampleForm = this.fb.group({
      imgurl:['', Validators.required],
      title:['', Validators.required],
      delref:''
    });
  }
  
  resetFields(){
    this.exampleForm = this.fb.group({
      imgurl: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      delref: new FormControl('')
    });
  }

  previmg:string='';
  nextimg:string='';
  upload(event){
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

  createPhoto(value){
    this.firebaseService.createPhoto(value);
    this.resetFields();
    this.nextimg='';
    this.goShow();
  }

  goDelete(id){
    let res = confirm("Are you sure about deleting this Photo?");
    if(res) this.firebaseService.deletePhoto(id);
    else return;
  }

}
