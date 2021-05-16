import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-tall-ads',
  templateUrl: './tall-ads.component.html',
  styleUrls: ['./tall-ads.component.css']
})
export class TallAdsComponent implements OnInit {

  create:boolean=false;
  show:boolean=false;
  edit:boolean=false;
  displayedColumns: string[] = ['image','actions'];
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
    this.firebaseService.getTallAds().subscribe(ads =>{
      this.dataSource=new MatTableDataSource<any>(ads);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel ='Ads per page:';
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
  showprog:boolean=false;

  exampleForm: FormGroup;
  
  createForm(){
    this.exampleForm = this.fb.group({
      imgurl:['', Validators.required ],
      delref:''
    });
  }
  
  resetFields(){
    this.exampleForm = this.fb.group({
      imgurl: new FormControl('', Validators.required),
      delref: new FormControl('')
    });
  }

  previmg:string='';
  nextimg:string='';
  upload(event){
    if(this.id){
      this.firebaseService.getTallAd(this.id).subscribe(ad=>{
        this.previmg=ad.payload.data()['delref'];
      })
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

  createAdvert(value){
      this.firebaseService.createTallAd(value);
      this.resetFields();
      this.nextimg='';
      this.goShow();
  }

  id:string;

  updateAdvert(value){
    if(this.previmg){
      let ref: AngularFireStorageReference = this.afs.ref(this.previmg);
      ref.delete();
      this.previmg='';
    }
    this.nextimg='';
    this.firebaseService.updateTallAd(this.id, value);
    this.goShow();
  }

  goEdit(id){
    this.id=id;
    this.edit=true; this.show=false;
    this.firebaseService.getTallAd(id).subscribe(ad=>{
      this.exampleForm.patchValue({
        imgurl: ad.payload.data()['imgurl'],
        delref: ad.payload.data()['delref']
      })
      this.url=ad.payload.data()['imgurl'];
    });
  }
  goDelete(id){
    let res = confirm("Are you sure about deleting this Ad?");
    if(res) {
      this.firebaseService.deleteTallAd(id);
    }
    else return;
  }

}
