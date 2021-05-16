import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-manage-zones',
  templateUrl: './manage-zones.component.html',
  styleUrls: ['./manage-zones.component.css']
})
export class ManageZonesComponent implements OnInit {

  create:boolean=false;
  show:boolean=false;
  edit:boolean=false;
  displayedColumns: string[] = ['image','zone','actions'];
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
    this.url1='';this.url2='';this.url3='';this.url4='';
  }
  goShow(){
    this.firebaseService.getAllZones().subscribe(ads =>{
      this.dataSource=new MatTableDataSource<any>(ads);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel ='Zones per page:';
    });
    this.show=true;this.create=false;this.edit=false;
    this.id='';
    this.previmg1='';
    this.previmg2='';
    this.previmg3='';
    this.previmg4='';
    this.createForm();
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

    if(this.nextimg4){
      let ref: AngularFireStorageReference = this.afs.ref(this.nextimg4);
      ref.delete();
      this.nextimg4='';
    }
  }
  
  validation_messages = {
    'name': [
      { type: 'required', message: 'Zone Name is required.' }
    ],
    'mname1': [
      { type: 'required', message: 'Member 1 Name is required.' }
    ],
    'mpos1': [
      { type: 'required', message: 'Member 1 Position is required.' }
    ],
    'mno1': [
      { type: 'required', message: 'Member 1 Contact No. is required.' }
    ],
    // 'pos': [
    //   { type: 'required', message: 'Zone Position is required.' }
    // ]
  };
  
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  url1:string;
  showprog1:boolean=false;
  url2:string;
  showprog2:boolean=false;
  url3:string;
  showprog3:boolean=false;
  url4:string;
  showprog4:boolean=false;

  exampleForm: FormGroup;
  
  createForm(){
    this.exampleForm = this.fb.group({
      name:['', Validators.required ],
      imgurl:['', Validators.required ],
      delref:'',
      mname1:['', Validators.required ],
      mname2:'',
      mname3:[''],
      mpos1:['', Validators.required ],
      mpos2:'',
      mpos3:'',
      mno1:['', Validators.required ],
      mno2:'',
      mno3:'',
      murl1:['', Validators.required ],
      murl2:'',
      murl3:'',
      mref1:['', Validators.required ],
      mref2:'',
      mref3:'',
      // pos:[ , Validators.required]
    });
  }

  previmg1:string='';
  nextimg1:string='';
  upload1(event){
    if(this.id){
      this.firebaseService.getZone(this.id).subscribe(ad=>{
        this.previmg1=ad.payload.data()['mref1'];
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
      mref1: this.nextimg1
    });
    this.ref.put(event.target.files[0])
    .then(snapshot=>{
      snapshot.ref.getDownloadURL().then(result=>{
        this.url1=result;
        this.exampleForm.patchValue({
          murl1: result
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
      this.firebaseService.getZone(this.id).subscribe(ad=>{
        this.previmg2=ad.payload.data()['mref2'];
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
      mref2: this.nextimg2
    });
    this.ref.put(event.target.files[0])
    .then(snapshot=>{
      snapshot.ref.getDownloadURL().then(result=>{
        this.url2=result;
        this.exampleForm.patchValue({
          murl2: result
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
        this.previmg3=ad.payload.data()['mref3'];
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
      mref3: this.nextimg3
    });
    this.ref.put(event.target.files[0])
    .then(snapshot=>{
      snapshot.ref.getDownloadURL().then(result=>{
        this.url3=result;
        this.exampleForm.patchValue({
          murl3: result
        });
        this.showprog3=false;
      })
    })
    .catch(err=>{
      alert(err)
    })
  }

  previmg4:string='';
  nextimg4:string='';
  upload4(event){
    if(this.id){
      this.firebaseService.getCenterAd(this.id).subscribe(ad=>{
        this.previmg4=ad.payload.data()['delref'];
      })
    }
    if(this.nextimg4){
      let ref: AngularFireStorageReference = this.afs.ref(this.nextimg4);
      ref.delete();
      this.nextimg4='';
    }
    this.showprog4=true;
    this.nextimg4= Math.random().toString(36).substring(2);
    this.ref=this.afs.ref(this.nextimg4);
    this.exampleForm.patchValue({
      delref: this.nextimg4
    });
    this.ref.put(event.target.files[0])
    .then(snapshot=>{
      snapshot.ref.getDownloadURL().then(result=>{
        this.url4=result;
        this.exampleForm.patchValue({
          imgurl: result
        });
        this.showprog4=false;
      })
    })
    .catch(err=>{
      alert(err)
    })
  }

  createZone(value){
      this.firebaseService.createZone(value);
      this.createForm();
      this.nextimg1='';
      this.nextimg2='';
      this.nextimg3='';
      this.nextimg4='';
      this.goShow();
  }

  id:string;

  updateZone(value){
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

    if(this.previmg4){
      let ref: AngularFireStorageReference = this.afs.ref(this.previmg4);
      ref.delete();
      this.previmg4='';
    }
    this.nextimg4='';
    this.firebaseService.updateZone(this.id, value);
    this.goShow();
  }

  goEdit(id){
    this.id=id;
    this.edit=true; this.show=false;
    this.firebaseService.getZone(id).subscribe(ad=>{
      this.exampleForm.patchValue({
        name: ad.payload.data()['name'],
        imgurl: ad.payload.data()['imgurl'],
        delref: ad.payload.data()['delref'],
        mname1: ad.payload.data()['mname1'],
        mname2: ad.payload.data()['mname2'],
        mname3: ad.payload.data()['mname3'],
        mpos1: ad.payload.data()['mpos1'],
        mpos2: ad.payload.data()['mpos2'],
        mpos3: ad.payload.data()['mpos3'],
        mno1: ad.payload.data()['mno1'],
        mno2: ad.payload.data()['mno2'],
        mno3: ad.payload.data()['mno3'],
        murl1: ad.payload.data()['murl1'],
        murl2: ad.payload.data()['murl2'],
        murl3: ad.payload.data()['murl3'],
        mref1: ad.payload.data()['mref1'],
        mref2: ad.payload.data()['mref2'],
        mref3: ad.payload.data()['mref3'],
        pos: ad.payload.data()['pos']
      });
      this.url1=ad.payload.data()['murl1'];
      this.url2=ad.payload.data()['murl2'];
      this.url3=ad.payload.data()['murl3'];
      this.url4=ad.payload.data()['imgurl'];
    });
  }
  goDelete(id){
    let res = confirm("Are you sure about deleting this Zone?");
    if(res) {
      this.firebaseService.deleteZone(id);
    }
    else return;
  }

}
