import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-directory-back',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryBackComponent implements OnInit {

  
  exampleForm: FormGroup;
  create:boolean=false;
  show:boolean=false;
  edit:boolean=false;
  displayedColumns: string[] = ['name','address','contact', 'birthday','anniversary', 'actions'];
  dataSource : MatTableDataSource<any[]>;
  dirs:any[]=[];
  id:string;
  elm:any={};
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;


  constructor( private fb: FormBuilder, private fs:FirebaseService) {
    this.goShow();
  }
  goCreate(){
    this.create=true;this.show=false;this.edit=false;
  }
  goShow(){
    this.fs.getDirectorysAlphabetically().subscribe(res =>{
      this.dirs=[];
      res.forEach(el=>{
        this.elm=el.payload.doc.data();
        this.elm['id']=el.payload.doc.id;
        this.dirs=this.dirs.concat(this.elm);
        this.elm=[];
      })
      this.dataSource=new MatTableDataSource<any>(this.dirs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel ='Items per page:';
    });
    this.show=true;this.create=false;this.edit=false;
    this.id='';
    this.createForm();
  }
  goEdit(id){
    this.id=id;
    this.edit=true; this.show=false;
    this.fs.getDirectory(id).subscribe(entry=>{
      this.exampleForm.patchValue({
        name: entry.payload.data()['name'],
        address: entry.payload.data()['address'],
        contact: entry.payload.data()['contact'],
        bday: entry.payload.data()['bday'],
        bmonth: entry.payload.data()['bmonth'],
        aday: entry.payload.data()['aday'],
        amonth: entry.payload.data()['amonth'],
        date: entry.payload.data()['date']
      })
    });
  }

  createForm(){
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      address: ['', Validators.required ],
      contact: ['', Validators.required ],
      bday: ['', Validators.required ],
      bmonth: ['', Validators.required ],
      aday: ['', Validators.required ],
      amonth: ['', Validators.required ],
      date:Date.now()
    });
  }
  goSubmit(value){
    this.fs.addDirectory(value).then(res=>{
      alert("Entry Added");
      this.createForm();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  updateDirectory(value){
    this.fs.updateDirectory(this.id, value);
    this.goShow();
  }
  goDelete(id){
    let c=confirm("Are you sure about deleting this entry?");
    if(c) this.fs.deleteDirectory(id);
  }

  ngOnInit(): void {
    this.createForm();
  }

}
