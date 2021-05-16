import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  
  displayedColumns: string[] = ['headline'];
  displayedColumns2: string[] = ['title'];
  dataSource : MatTableDataSource<any[]>;
  dataSource2 : MatTableDataSource<any[]>;
  
  @ViewChild('newspaginator', {read: MatPaginator}) paginator: MatPaginator;

  @ViewChild('eventspaginator', {read: MatPaginator}) paginator2: MatPaginator;


  constructor(private router: Router, public firebaseService: FirebaseService) {
    firebaseService.getAllNews().subscribe(res =>{
      this.dataSource=new MatTableDataSource<any>(res);
      setTimeout(cb=>{
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel ='News per page:';
      }, 1500);
    });
    firebaseService.getAllEvents().subscribe(res =>{
      this.dataSource2=new MatTableDataSource<any>(res);
      setTimeout(cb=>{
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.paginator._intl.itemsPerPageLabel ='Events per page:';
      }, 1500);
    })
   }

  ngOnInit(): void {
  }

  goFullNews(id){
    this.firebaseService.setNid(id);
    this.router.navigateByUrl('fullnews');
  }
  goFullEvent(id){
    this.firebaseService.setNid(id);
    this.router.navigateByUrl('fullevent');
  }

}
