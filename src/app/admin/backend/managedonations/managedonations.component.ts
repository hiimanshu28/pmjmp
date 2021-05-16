import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-managedonations',
  templateUrl: './managedonations.component.html',
  styleUrls: ['./managedonations.component.css']
})
export class ManagedonationsComponent implements OnInit {

  create:boolean=false;
  show:boolean=false;
  edit:boolean=false;
  displayedColumns: string[] = ['image','blank','name', 'actions'];
  dataSource : MatTableDataSource<any[]>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public firebaseService: FirebaseService,
    private afs: AngularFireStorage) {
      this.goShow();
    }

  ngOnInit(): void {
    this.createForm();
  }
  
  goCreate(){
    this.create=true;this.show=false;this.edit=false;this.url='';
  }
  goShow(){
    this.firebaseService.getAllDonations().subscribe(res =>{
    this.dataSource=new MatTableDataSource<any>(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel ='Donations per page:';
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
  progress=0;
  showprog:boolean=false;

  exampleForm: FormGroup;
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'address': [
      { type: 'required', message: 'Address is required.' }
    ],
    'description': [
      { type: 'required', message: 'Description is required.' }
    ]
  };
  
  createForm(){
    this.exampleForm = this.fb.group({
      name: ['', Validators.required],
      imgurl:['', Validators.required],
      description:['', Validators.required],
      address:['', Validators.required],
      delref:''
    });
  }
  
  resetFields(){
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      imgurl: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      delref: new FormControl('')
    });
  }

  previmg:string='';
  nextimg:string='';
  upload(event){
    if(this.id){
      this.firebaseService.getDonation(this.id).subscribe(ad=>{
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
        this.showprog=false;
      })
    })
    .catch(err=>{
      alert(err)
    })
  }

  createDonation(value){
    this.firebaseService.createDonation(value);
    this.resetFields();
    this.nextimg='';
    this.goShow();
  }

  id:string;

  updateDonation(value){
    if(this.previmg){
      let ref: AngularFireStorageReference = this.afs.ref(this.previmg);
      ref.delete();
      this.previmg='';
    }
    this.nextimg='';
    this.firebaseService.updateDonation(this.id, value);
    this.goShow();
  }

  goEdit(id){
    this.id=id;
    this.edit=true; this.show=false;
    this.firebaseService.getDonation(id).subscribe(res=>{
      this.exampleForm.patchValue({
        name: res.payload.data()['name'],
        imgurl: res.payload.data()['imgurl'],
        delref: res.payload.data()['delref'],
        description: res.payload.data()['description'],
        address: res.payload.data()['address']
      })
      this.url=res.payload.data()['imgurl'];
    });
  }
  goDelete(id){
    let res = confirm("Are you sure about deleting this Donator?");
    if(res) this.firebaseService.deleteDonation(id);
    else return;
  }

}
