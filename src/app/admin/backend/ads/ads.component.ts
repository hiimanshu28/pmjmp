import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit{

  create:boolean=false;
  show:boolean=false;
  edit:boolean=false;
  displayedColumns: string[] = ['image1','image2','image3','actions'];
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
    this.create=true;this.show=false;this.edit=false;
    this.url1='';this.url2='';this.url3='';
  }
  goShow(){
    this.firebaseService.getCenterAds().subscribe(ads =>{
      this.dataSource=new MatTableDataSource<any>(ads);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel ='Ads per page:';
    });
    this.show=true;this.create=false;this.edit=false;
    this.id='';
    this.previmg1='';
    this.previmg2='';
    this.previmg3='';
    this.resetFields(); //update this
    if(this.nextimg1){
      let ref: AngularFireStorageReference = this.afs.ref(this.nextimg1);
      ref.delete();
      this.nextimg1='';
    }
    
    if(this.nextimg2){
      let ref: AngularFireStorageReference = this.afs.ref(this.nextimg2);
      ref.delete();
      this.nextimg2='';
    }
    
    if(this.nextimg3){
      let ref: AngularFireStorageReference = this.afs.ref(this.nextimg3);
      ref.delete();
      this.nextimg3='';
    }
  }
  
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  url1:string;
  showprog1:boolean=false;
  url2:string;
  showprog2:boolean=false;
  url3:string;
  showprog3:boolean=false;

  exampleForm: FormGroup;
  
  createForm(){
    this.exampleForm = this.fb.group({
      imgurl1:['', Validators.required ],
      imgurl2:['', Validators.required ],
      imgurl3:['', Validators.required ],
      delref1:'',
      delref2:'',
      delref3:''
    });
  }
  
  resetFields(){
    this.exampleForm = this.fb.group({
      imgurl1: new FormControl('', Validators.required),
      imgurl2: new FormControl('', Validators.required),
      imgurl3: new FormControl('', Validators.required),
      delref1: new FormControl(''),
      delref2: new FormControl(''),
      delref3: new FormControl('')
    });
  }

  previmg1:string='';
  nextimg1:string='';
  upload1(event){
    console.log('upload1 executed');
    if(this.id){
      this.firebaseService.getCenterAd(this.id).subscribe(ad=>{
        this.previmg1=ad.payload.data()['delref1'];
      })
    }
    if(this.nextimg1){
      let ref: AngularFireStorageReference = this.afs.ref(this.nextimg1);
      ref.delete();
      this.nextimg1='';
    }
    this.showprog1=true;
    this.nextimg1= Math.random().toString(36).substring(2);
    this.ref=this.afs.ref(this.nextimg1);
    this.exampleForm.patchValue({
      delref1: this.nextimg1
    });
    this.ref.put(event.target.files[0])
    .then(snapshot=>{
      snapshot.ref.getDownloadURL().then(result=>{
        this.url1=result;
        this.exampleForm.patchValue({
          imgurl1: result
        });
        this.showprog1=false;
      })
    })
    .catch(err=>{
      alert(err)
    })
  }

  previmg2:string='';
  nextimg2:string='';
  upload2(event){
    if(this.id){
      this.firebaseService.getCenterAd(this.id).subscribe(ad=>{
        this.previmg2=ad.payload.data()['delref2'];
      })
    }
    if(this.nextimg2){
      let ref: AngularFireStorageReference = this.afs.ref(this.nextimg2);
      ref.delete();
      this.nextimg2='';
    }
    this.showprog2=true;
    this.nextimg2= Math.random().toString(36).substring(2);
    this.ref=this.afs.ref(this.nextimg2);
    this.exampleForm.patchValue({
      delref2: this.nextimg2
    });
    this.ref.put(event.target.files[0])
    .then(snapshot=>{
      snapshot.ref.getDownloadURL().then(result=>{
        this.url2=result;
        this.exampleForm.patchValue({
          imgurl2: result
        });
        this.showprog2=false;
      })
    })
    .catch(err=>{
      alert(err)
    })
  }

  previmg3:string='';
  nextimg3:string='';
  upload3(event){
    if(this.id){
      this.firebaseService.getCenterAd(this.id).subscribe(ad=>{
        this.previmg3=ad.payload.data()['delref3'];
      })
    }
    if(this.nextimg3){
      let ref: AngularFireStorageReference = this.afs.ref(this.nextimg3);
      ref.delete();
      this.nextimg3='';
    }
    this.showprog3=true;
    this.nextimg3= Math.random().toString(36).substring(2);
    this.ref=this.afs.ref(this.nextimg3);
    this.exampleForm.patchValue({
      delref3: this.nextimg3
    });
    this.ref.put(event.target.files[0])
    .then(snapshot=>{
      snapshot.ref.getDownloadURL().then(result=>{
        this.url3=result;
        this.exampleForm.patchValue({
          imgurl3: result
        });
        this.showprog3=false;
      })
    })
    .catch(err=>{
      alert(err)
    })
  }

  createAdvert(value){
      this.firebaseService.createCenterAd(value);
      this.resetFields();
      this.nextimg1='';
      this.nextimg2='';
      this.nextimg3='';
      this.goShow();
  }

  id:string;

  updateAdvert(value){
    if(this.previmg1){
      let ref: AngularFireStorageReference = this.afs.ref(this.previmg1);
      ref.delete();
      this.previmg1='';
    }
    this.nextimg1='';

    if(this.previmg2){
      let ref: AngularFireStorageReference = this.afs.ref(this.previmg2);
      ref.delete();
      this.previmg2='';
    }
    this.nextimg2='';

    if(this.previmg3){
      let ref: AngularFireStorageReference = this.afs.ref(this.previmg3);
      ref.delete();
      this.previmg3='';
    }
    this.nextimg3='';
    this.firebaseService.updateCenterAd(this.id, value);
    this.goShow();
  }

  goEdit(id){
    this.id=id;
    this.edit=true; this.show=false;
    this.firebaseService.getCenterAd(id).subscribe(ad=>{
      this.exampleForm.patchValue({
        imgurl1: ad.payload.data()['imgurl1'],
        delref1: ad.payload.data()['delref1'],
        imgurl2: ad.payload.data()['imgurl2'],
        delref2: ad.payload.data()['delref2'],
        imgurl3: ad.payload.data()['imgurl3'],
        delref3: ad.payload.data()['delref3']
      })
      this.url1=ad.payload.data()['imgurl1'];
      this.url2=ad.payload.data()['imgurl2'];
      this.url3=ad.payload.data()['imgurl3'];
    });
  }
  goDelete(id){
    let res = confirm("Are you sure about deleting this Ad?");
    if(res) {
      this.firebaseService.deleteCenterAd(id);
    }
    else return;
  }

}
