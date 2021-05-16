import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  displayedColumns: string[] = ['name','address','contact', 'birthday','anniversary'];
  dataSource : MatTableDataSource<any[]>;
  dirs:any[]=[];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public firebaseService: FirebaseService) {
      this.firebaseService.getDirectorysAlphabetically().subscribe(res =>{
        this.dirs = [];
        res.forEach(el=>{
          this.dirs=this.dirs.concat(el.payload.doc.data());
        })
        this.dataSource=new MatTableDataSource<any>(this.dirs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator._intl.itemsPerPageLabel ='Items per page:';
      });
    }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngOnInit(): void {
  }

}