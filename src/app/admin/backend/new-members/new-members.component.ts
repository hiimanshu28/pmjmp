import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-members',
  templateUrl: './new-members.component.html',
  styleUrls: ['./new-members.component.css']
})
export class NewMembersComponent implements OnInit {

  create:boolean=false;
  show:boolean=false;
  edit:boolean=false;
  displayedColumns: string[] = ['photo', 'name', 'email', 'contact', 'actions'];
  dataSource : MatTableDataSource<any[]>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private r:Router,
    public dialog: MatDialog,
    public firebaseService: FirebaseService) {
      this.firebaseService.getnewMembers().subscribe(res =>{
      this.dataSource=new MatTableDataSource<any>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel ='Members per page:';
      });
  }

  goDelete(id){
    let ans=confirm("Are you sure about deleting this new Member?");
    if(ans) this.firebaseService.deletenewMember(id);
    else return;
  }
  goDetails(id){
    this.firebaseService.setNid(id);
    this.r.navigateByUrl('adminbackend/full-member-details');
  }

  ngOnInit(): void {
  }

}