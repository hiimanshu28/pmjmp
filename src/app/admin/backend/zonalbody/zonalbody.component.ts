import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-zonalbody',
  templateUrl: './zonalbody.component.html',
  styleUrls: ['./zonalbody.component.css']
})
export class ZonalbodyComponent implements OnInit {


  create:boolean=false;
  show:boolean=false;
  edit:boolean=false;
  displayedColumns: string[] = ['image', 'name', 'position', 'contact', 'rank', 'actions'];
  pos: string[] = ['President', 'Vice President','Secretary','Joint Secretary','Treasurer','Executive Members','Media Prabandhan','PRO'];
  
  dataSource : MatTableDataSource<any[]>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router, private ar: ActivatedRoute,
    public firebaseService: FirebaseService,
    private afs: AngularFireStorage) {
      this.goShow();
  }

  ngOnInit(): void {
    this.createForm();
  }
  
  goCreate(){
    this.create=true;this.show=false;this.edit=false;
    this.imgUploaded=false;
  }
  goShow(){
    this.firebaseService.getAllZonalBodys().subscribe(members =>{
      this.dataSource=new MatTableDataSource<any>(members);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel ='Members per page:';
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
  goEdit(id){
    this.id=id;
    this.edit=true; this.show=false;
    this.firebaseService.getZonalBody(id).subscribe(member=>{
      this.exampleForm.patchValue({
        name: member.payload.data()['name'],
        position: member.payload.data()['position'],
        contact: member.payload.data()['contact'],
        rank: member.payload.data()['rank'],
        imgurl: member.payload.data()['imgurl'],
        delref: member.payload.data()['delref']
      })
      this.url=member.payload.data()['imgurl'];
    });
  }
  
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  url:string;
  imgUploaded:boolean=false;
  progress=0;
  showprog:boolean=false;

  exampleForm: FormGroup;
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'position': [
      { type: 'required', message: 'Position is required.' }
    ],
    'rank': [
      { type: 'required', message: 'Rank is required.' }
    ]
  };
  
  createForm(){
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      position: ['', Validators.required ],
      contact: [''],
      imgurl:['', Validators.required ],
      delref:'',
      rank: [, Validators.required ]
    });
  }
  
  resetFields(){
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      contact: new FormControl(''),
      imgurl: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      delref: new FormControl(''),
      rank: new FormControl(Validators.required)
    });
  }

  previmg:string='';
  nextimg:string='';
  upload(event){
    if(this.id){
      this.firebaseService.getZonalBody(this.id).subscribe(ad=>{
        this.previmg=ad.payload.data()['delref'];
      })
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
    });
  }

  addMember(value){
      this.firebaseService.addZonalBody(value);
      this.resetFields();
      this.nextimg='';
      this.goShow();
  }

  id:string;

  updateMember(value){
    if(this.previmg){
      let ref: AngularFireStorageReference = this.afs.ref(this.previmg);
      ref.delete();
      this.previmg='';
    }
    this.nextimg='';
    this.firebaseService.updateZonalBody(this.id, value);
    this.goShow();
  }

  goDelete(id){
    let res = confirm("Are you sure about deleting this Member?");
    if(res) this.firebaseService.deleteZonalBody(id);
    else return;
  }

}