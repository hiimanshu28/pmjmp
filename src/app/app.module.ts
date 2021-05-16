import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material/paginator";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';


import { SliderModule } from 'angular-image-slider';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseService } from './services/firebase.service';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MyauthService } from './services/myauth.service';
import { BackendComponent } from './admin/backend/backend.component';
import { AloginComponent } from './admin/alogin/alogin.component';
import { AdsComponent } from './admin/backend/ads/ads.component';
import { AboutComponent } from './about/about.component';
import { MatrimonyComponent } from './matrimony/matrimony.component';
import { SigninComponent } from './user/signin/signin.component';
import { RegisterComponent } from './user/register/register.component';
import { VerificationComponent } from './user/verification/verification.component';
import { ResetpwComponent } from './user/resetpw/resetpw.component';
import { ProfileComponent } from './user/profile/profile.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { FullprofileComponent } from './user/fullprofile/fullprofile.component';
import { ManageusersComponent } from './admin/backend/manageusers/manageusers.component';
import { ManagenewsComponent } from './admin/backend/managenews/managenews.component';
import { PhotosComponent } from './gallery/photos/photos.component';
import { VideosComponent } from './gallery/videos/videos.component';
import { ActivitiesComponent } from './gallery/activities/activities.component';
import { NewsComponent } from './news/news.component';
import { FullnewsComponent } from './news/fullnews/fullnews.component';
import { ManagephotosComponent } from './admin/backend/managephotos/managephotos.component';
import { ManagevideosComponent } from './admin/backend/managevideos/managevideos.component';
import { ManageactivitiesComponent } from './admin/backend/manageactivities/manageactivities.component';
import { ContactComponent } from './contact/contact.component';
import { GoverningbodyComponent } from './admin/backend/governingbody/governingbody.component';
import { SanrakshaksadasysComponent } from './admin/backend/sanrakshaksadasys/sanrakshaksadasys.component';
import { PresidentComponent } from './admin/backend/president/president.component';
import { VicepresidentComponent } from './admin/backend/vicepresident/vicepresident.component';
import { SecretaryComponent } from './admin/backend/secretary/secretary.component';
import { JointsecretaryComponent } from './admin/backend/jointsecretary/jointsecretary.component';
import { TreasurerComponent } from './admin/backend/treasurer/treasurer.component';
import { ProComponent } from './admin/backend/pro/pro.component';
import { ExecutivemembersComponent } from './admin/backend/executivemembers/executivemembers.component';
import { AnushashansamitiComponent } from './admin/backend/anushashansamiti/anushashansamiti.component';
import { MahilasamitiComponent } from './admin/backend/mahilasamiti/mahilasamiti.component';
import { SadasyatavikassamitiComponent } from './admin/backend/sadasyatavikassamiti/sadasyatavikassamiti.component';
import { MediaprabhandanComponent } from './admin/backend/mediaprabhandan/mediaprabhandan.component';
import { SafePipe } from './pipes/safe.pipe';
import { TallAdsComponent } from './admin/backend/tall-ads/tall-ads.component';
import { FooterAdsComponent } from './admin/backend/footer-ads/footer-ads.component';
import { ManageEventsComponent } from './admin/backend/manage-events/manage-events.component';
import { FulleventComponent } from './news/fullevent/fullevent.component';
import { FullactComponent } from './gallery/activities/fullact/fullact.component';
import { KkvakComponent } from './kkvak/kkvak.component';
import { ManageKkvakComponent } from './admin/backend/manage-kkvak/manage-kkvak.component';
import { FullKkvakComponent } from './kkvak/full-kkvak/full-kkvak.component';
import { ManageZonesComponent } from './admin/backend/manage-zones/manage-zones.component';
import { ZonesComponent } from './zones/zones.component';
import { FullzoneComponent } from './zones/fullzone/fullzone.component';
import { DonationsComponent } from './donations/donations.component';
import { ManagedonationsComponent } from './admin/backend/managedonations/managedonations.component';
import { BecomeAMemberComponent } from './become-a-member/become-a-member.component';
import { NewMembersComponent } from './admin/backend/new-members/new-members.component';
import { FullMemberDetailsComponent } from './admin/backend/full-member-details/full-member-details.component';
import { ZonalComponent } from './zonal/zonal.component';
import { NationalComponent } from './national/national.component';
import { DirectoryComponent } from './directory/directory.component';
import { ZonalbodyComponent } from './admin/backend/zonalbody/zonalbody.component';
import { NationalbodyComponent } from './admin/backend/nationalbody/nationalbody.component';
import { DirectoryBackComponent } from './admin/backend/directory/directory.component';
import { MessagesComponent } from './admin/backend/messages/messages.component';
import { PaymentService } from './payment.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPrintModule } from 'ngx-print';
import { WindowRef } from './windowRef.service';
import { FullpicComponent } from './user/fullpic/fullpic.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BackendComponent,
    AloginComponent,
    AdsComponent,
    AboutComponent,
    MatrimonyComponent,
    SigninComponent,
    RegisterComponent,
    VerificationComponent,
    ResetpwComponent,
    ProfileComponent,
    EditProfileComponent,
    FullprofileComponent,
    ManageusersComponent,
    ManagenewsComponent,
    PhotosComponent,
    VideosComponent,
    ActivitiesComponent,
    NewsComponent,
    FullnewsComponent,
    ManagephotosComponent,
    ManagevideosComponent,
    ManageactivitiesComponent,
    ContactComponent,
    GoverningbodyComponent,
    SanrakshaksadasysComponent,
    PresidentComponent,
    VicepresidentComponent,
    SecretaryComponent,
    JointsecretaryComponent,
    TreasurerComponent,
    ProComponent,
    ExecutivemembersComponent,
    AnushashansamitiComponent,
    MahilasamitiComponent,
    SadasyatavikassamitiComponent,
    MediaprabhandanComponent,
    SafePipe,
    TallAdsComponent,
    FooterAdsComponent,
    ManageEventsComponent,
    FulleventComponent,
    FullactComponent,
    KkvakComponent,
    ManageKkvakComponent,
    FullKkvakComponent,
    ManageZonesComponent,
    ZonesComponent,
    FullzoneComponent,
    DonationsComponent,
    ManagedonationsComponent,
    BecomeAMemberComponent,
    NewMembersComponent,
    FullMemberDetailsComponent,
    ZonalComponent,
    NationalComponent,
    DirectoryComponent,
    DirectoryBackComponent,
    ZonalbodyComponent,
    NationalbodyComponent,
    MessagesComponent,
    FullpicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,MatPaginatorModule,MatTableModule,MatCardModule,MatGridListModule,
    NgbModule,MatDividerModule,MatDatepickerModule,MatNativeDateModule,
    ReactiveFormsModule, FormsModule,
    MatInputModule,MatButtonModule,MatDialogModule,MatSelectModule,MatSortModule,MatMenuModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,SliderModule,
    HttpClientModule,
    NgxPrintModule
  ],
  providers: [ FirebaseService, MyauthService, PaymentService, WindowRef,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
