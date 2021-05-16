import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  
  displayedColumns: string[] = ['title'];
  dataSource : MatTableDataSource<any[]>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private router: Router, public firebaseService: FirebaseService) {
    firebaseService.getAllActivities().subscribe(res =>{
      this.dataSource=new MatTableDataSource<any>(res);
      setTimeout(cb=>{
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel ='Activities per page:';
      }, 1500);
    });
   }

  ngOnInit(): void {
  }

  goFullActivity(id){
    this.firebaseService.setNid(id);
    this.router.navigateByUrl('fullact');
  }
  
}
