import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.scss']
})
export class BackendComponent implements OnInit {

  constructor(private r:Router, private fs:FirebaseService) { }

  ngOnInit(): void {
  }

  goTallAds(){
    this.r.navigateByUrl('adminbackend/tallads');
  }
  goMessages(){
    this.r.navigateByUrl('adminbackend/messages');
  }
  goCenterAds(){
    this.r.navigateByUrl('adminbackend/ads');
  }
  goDirectory(){
    this.r.navigateByUrl('adminbackend/directory');
  }
  goZonalBody(){
    this.r.navigateByUrl('adminbackend/zonalbody');
  }
  goNationalBody(){
    this.r.navigateByUrl('adminbackend/nationalbody');
  }
  goZones(){
    this.r.navigateByUrl('adminbackend/zones');
  }
  goNewMember(){
    this.r.navigateByUrl('adminbackend/newmember');
  }
  goDonations(){
    this.r.navigateByUrl('adminbackend/donations');
  }
  goFooterAds(){
    this.r.navigateByUrl('adminbackend/footerads');
  }
  goGoverningBody(){
    this.r.navigateByUrl('adminbackend/governingbody');
  }
  goSanrakshakSadasya(){
    this.r.navigateByUrl('adminbackend/sanrakshaksadasya');
  }
  goPresident(){
    this.r.navigateByUrl('adminbackend/president');
  }
  goVicePresident(){
    this.r.navigateByUrl('adminbackend/vicepresident');
  }
  goSecretary(){
    this.r.navigateByUrl('adminbackend/secretary');
  }
  goJointSecretary(){
    this.r.navigateByUrl('adminbackend/jointsecretary');
  }
  goTreasurer(){
    this.r.navigateByUrl('adminbackend/treasurer');
  }
  goPro(){
    this.r.navigateByUrl('adminbackend/pro');
  }
  goExecutiveMembers(){
    this.r.navigateByUrl('adminbackend/executivemembers');
  }
  goAnushashanSamiti(){
    this.r.navigateByUrl('adminbackend/anushashansamiti');
  }
  goMahilaSamiti(){
    this.r.navigateByUrl('adminbackend/mahilasamiti');
  }
  goSadasyataVikasSamiti(){
    this.r.navigateByUrl('adminbackend/sadasyatavikassamiti');
  }
  goMediaPrabhandan(){
    this.r.navigateByUrl('adminbackend/mediaprabhandan');
  }
  goUsers(){
    this.r.navigateByUrl('adminbackend/users');
  }
  goNews(){
    this.r.navigateByUrl('adminbackend/news');
  }
  goEvents(){
    this.r.navigateByUrl('adminbackend/events');
  }
  goPhotos(){
    this.r.navigateByUrl('adminbackend/photos');
  }
  goVideos(){
    this.r.navigateByUrl('adminbackend/videos');
  }
  goActivities(){
    this.r.navigateByUrl('adminbackend/activities');
  }
  goKkvak(){
    this.r.navigateByUrl('adminbackend/kkvak');
  }

  logOut(){
    this.fs.adminLout();
    this.r.navigateByUrl('adminpanel');
  }

}
