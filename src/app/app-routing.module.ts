import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AloginComponent } from './admin/alogin/alogin.component';
import { BackendComponent } from './admin/backend/backend.component';
import { AdsComponent } from './admin/backend/ads/ads.component';
import { AboutComponent } from './about/about.component';
import { MatrimonyComponent } from './matrimony/matrimony.component';
import { SigninComponent } from './user/signin/signin.component';
import { RegisterComponent } from './user/register/register.component';
import { VerificationComponent } from './user/verification/verification.component';
import { ResetpwComponent } from './user/resetpw/resetpw.component';
import { ProfileComponent } from './user/profile/profile.component';
import { MatrGuard } from './guards/matr.guard';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { FullprofileComponent } from './user/fullprofile/fullprofile.component';
import { AdminGuard } from './guards/admin.guard';
import { ManageusersComponent } from './admin/backend/manageusers/manageusers.component';
import { ManagenewsComponent } from './admin/backend/managenews/managenews.component';
import { NewsComponent } from './news/news.component';
import { PhotosComponent } from './gallery/photos/photos.component';
import { VideosComponent } from './gallery/videos/videos.component';
import { ActivitiesComponent } from './gallery/activities/activities.component';
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
import { FooterAdsComponent } from './admin/backend/footer-ads/footer-ads.component';
import { TallAdsComponent } from './admin/backend/tall-ads/tall-ads.component';
import { ManageEventsComponent } from './admin/backend/manage-events/manage-events.component';
import { FulleventComponent } from './news/fullevent/fullevent.component';
import { FullactComponent } from './gallery/activities/fullact/fullact.component';
import { ManageKkvakComponent } from './admin/backend/manage-kkvak/manage-kkvak.component';
import { KkvakComponent } from './kkvak/kkvak.component';
import { FullKkvakComponent } from './kkvak/full-kkvak/full-kkvak.component';
import { ManageZonesComponent } from './admin/backend/manage-zones/manage-zones.component';
import { ZonesComponent } from './zones/zones.component';
import { FullzoneComponent } from './zones/fullzone/fullzone.component';
import { DonationsComponent } from './donations/donations.component';
import { ManagedonationsComponent } from './admin/backend/managedonations/managedonations.component';
import { NewMembersComponent } from './admin/backend/new-members/new-members.component';
import { BecomeAMemberComponent } from './become-a-member/become-a-member.component';
import { FullMemberDetailsComponent } from './admin/backend/full-member-details/full-member-details.component';
import { NationalComponent } from './national/national.component';
import { ZonalComponent } from './zonal/zonal.component';
import { DirectoryComponent } from './directory/directory.component';
import { NationalbodyComponent } from './admin/backend/nationalbody/nationalbody.component';
import { ZonalbodyComponent } from './admin/backend/zonalbody/zonalbody.component';
import { DirectoryBackComponent } from './admin/backend/directory/directory.component';
import { MessagesComponent } from './admin/backend/messages/messages.component';
import { FullpicComponent } from './user/fullpic/fullpic.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'zones', component: ZonesComponent},
  { path: 'news', component: NewsComponent},
  { path: 'nationalbody', component: NationalComponent},
  { path: 'zonalbody', component: ZonalComponent},
  { path: 'directory', component: DirectoryComponent},
  { path: 'become-a-member', component: BecomeAMemberComponent},
  { path: 'fullnews', component: FullnewsComponent},
  { path: 'fullevent', component: FulleventComponent},
  { path: 'fullact', component: FullactComponent},
  { path: 'fullkkvak', component: FullKkvakComponent},
  { path: 'fullzone', component: FullzoneComponent},
  { path: 'photos', component: PhotosComponent},
  { path: 'videos', component: VideosComponent},
  { path: 'activities', component: ActivitiesComponent},
  { path: 'kkvak', component: KkvakComponent},
  { path: 'donations', component: DonationsComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'matrimony', component: MatrimonyComponent, canActivate:[MatrGuard], children: []},
  { path: 'signin', component: SigninComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'verification', component: VerificationComponent},
  { path: 'resetpw', component: ResetpwComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'fullprofile', component: FullprofileComponent},
  { path: 'fullpic', component: FullpicComponent},
  { path: 'editprofile', component: EditProfileComponent},
  { path: 'adminpanel', component: AloginComponent},
  { path: 'adminbackend', component: BackendComponent, canActivate:[AdminGuard], children: [
    { path: 'ads', component: AdsComponent},
    { path: 'footerads', component: FooterAdsComponent},
    { path: 'tallads', component: TallAdsComponent},
    { path: 'messages', component: MessagesComponent},
    { path: 'nationalbody', component: NationalbodyComponent},
    { path: 'zonalbody', component: ZonalbodyComponent},
    { path: 'directory', component: DirectoryBackComponent},
    { path: 'donations', component: ManagedonationsComponent},
    { path: 'zones', component: ManageZonesComponent},
    { path: 'governingbody', component: GoverningbodyComponent},
    { path: 'sanrakshaksadasya', component: SanrakshaksadasysComponent},
    { path: 'president', component: PresidentComponent},
    { path: 'vicepresident', component: VicepresidentComponent},
    { path: 'secretary', component: SecretaryComponent},
    { path: 'jointsecretary', component: JointsecretaryComponent},
    { path: 'treasurer', component: TreasurerComponent},
    { path: 'pro', component: ProComponent},
    { path: 'executivemembers', component: ExecutivemembersComponent},
    { path: 'newmember', component: NewMembersComponent},
    { path: 'full-member-details', component: FullMemberDetailsComponent},
    { path: 'anushashansamiti', component: AnushashansamitiComponent},
    { path: 'mahilasamiti', component: MahilasamitiComponent},
    { path: 'sadasyatavikassamiti', component: SadasyatavikassamitiComponent},
    { path: 'mediaprabhandan', component: MediaprabhandanComponent},
    { path: 'users', component: ManageusersComponent},
    { path: 'news', component: ManagenewsComponent},
    { path: 'events', component: ManageEventsComponent},
    { path: 'photos', component: ManagephotosComponent},
    { path: 'videos', component: ManagevideosComponent},
    { path: 'activities', component: ManageactivitiesComponent},
    { path: 'kkvak', component: ManageKkvakComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
