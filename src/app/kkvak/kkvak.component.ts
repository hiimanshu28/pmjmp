import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kkvak',
  templateUrl: './kkvak.component.html',
  styleUrls: ['./kkvak.component.css']
})
export class KkvakComponent implements OnInit {
  
  displayedColumns: string[] = ['image'];
  dataSource1 : MatTableDataSource<any[]>;

  displayedColumns2: string[] = ['title'];
  dataSource2 : MatTableDataSource<any[]>;

  @ViewChild('vid', {read: MatPaginator}) paginator1: MatPaginator;
  
  @ViewChild('vak', {read: MatPaginator}) paginator2: MatPaginator;

  constructor(private firebaseService: FirebaseService, private r:Router) {
    this.firebaseService.getAllKkvids().subscribe(res =>{
      this.dataSource1=new MatTableDataSource<any>(res);
      this.dataSource1.paginator = this.paginator1;
      this.dataSource1.paginator._intl.itemsPerPageLabel ='Videos per page:';
    });
    this.firebaseService.getAllKkvaks().subscribe(res =>{
      this.dataSource2=new MatTableDataSource<any>(res);
      this.dataSource2.paginator = this.paginator2;
    });
  }

  goFullKkvk(value){
    this.firebaseService.setNid(value);
    this.r.navigateByUrl('fullkkvak');
  }

  ngOnInit(): void {
  }

}
