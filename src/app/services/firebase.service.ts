import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  selectedPlan:string='';
  setSelectedPlan(plan){
    this.selectedPlan=plan;
    localStorage.setItem('pid', this.selectedPlan);
  }

  adminSub: Subject<boolean>= new Subject<boolean>();
  adminObs = this.adminSub.asObservable();


  constructor(public db: AngularFirestore,private afs: AngularFireStorage) {}

  adminIn:boolean=false;

  picurl:string='';
  setUrl(url){
    this.picurl=url;
  }
  getUrl(){
    return this.picurl;
  }

  ouid:any='';
  setOuid(value){
    this.ouid=value;
  }
  getOuid(){
    return this.ouid;
  }
  nid:any='';
  setNid(value){
    this.nid=value;
  }
  getNid(){
    return this.nid;
  }


  adminLin(){
    this.adminIn=true;
  }
  adminLout(){
    this.adminIn=false;
  }

  getImages(){
      return this.db.collection('/images').valueChanges();
  }

  addMessage(value){
    return this.db.collection('messages').add({
      email: value.uname,
      phn: value.phn,
      message: value.message
    });
  }
  getMessages(){
    return this.db.collection('messages').snapshotChanges();
  }
  deleteUser(key){
    return this.db.collection('users').doc(key).delete();
  }

  getUsers(){
    return this.db.collection('users',ref => ref.orderBy('date','desc')).snapshotChanges();
  }
  getFilteredUsers(value){
    return this.db.collection('users',ref => ref.orderBy('date','desc').where('religion', '==', value.religion).where('complexion', '==', value.complexion).where('manglik', '==', value.manglik)).snapshotChanges();
  }
  getUser(id){
    return this.db.collection('users').doc(id).snapshotChanges();
  }
  updateUser(id, value){
    alert('Profile Updated Successfully');
    return this.db.collection('users').doc(id).update({
      displayName: value.displayName,
      photoURL: value.photoURL,
      address: value.address,
      phone: value.phone,
      dob: value.dob,
      tob: value.tob,
      pob: value.pob,
      gender: value.gender,
      caste: value.caste,
      manglik: value.manglik,
      feet: value.feet,
      inch: value.inch,
      complexion: value.complexion,
      religion: value.religion,
      equ: value.equ,
      oqu: value.oqu,
      occupation: value.occupation,
      income: value.income,
      city: value.city,
      polp: value.polp,
      smoke: value.smoke,
      drink: value.drink,
      hobbies: value.hobbies,
      delref: value.delref
    });
  }
  // updateUser2(id){
  //   alert('This user profile has been verified for payment');
  //   return this.db.collection('users').doc(id).update({
  //     verified: true
  //   });
  // }

  newOrder(uid, pid, total, payid){
    return this.db.collection('orders').add({
      uid:uid,
      pid:pid,
      total:total,
      payid:payid
    });
  }
  getOrders(){
    return this.db.collection('orders').snapshotChanges();
  }
  deleteOrder(key){
    return this.db.collection('orders').doc(key).delete();
  }

  userOrders(searchValue){
    return this.db.collection('orders',ref => ref.where('uid', '==', searchValue)).snapshotChanges();
  }


  searchPlansByAge(value){
    return this.db.collection('plans',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }

  //CRUD Kkvaks
  createKkvak(value){
    return this.db.collection('Kkvaks').add({
      title: value.title,
      para1: value.para1,
      para2: value.para2,
      para3: value.para3,
      author: value.author,
      date: Date.now()
    });
  }
  deleteKkvak(id){
    return this.db.collection('Kkvaks').doc(id).delete();
  }
  getAllKkvaks(){
    return this.db.collection('Kkvaks',ref => ref.orderBy('date', 'desc')).snapshotChanges();
  }
  getLatestKkvaks(){
    return this.db.collection('Kkvaks',ref => ref.orderBy('date', 'desc').limit(5)).snapshotChanges();
  }
  getKkvak(id){
    return this.db.collection('Kkvaks').doc(id).snapshotChanges();
  }
  updateKkvak(id, value){
    return this.db.collection('Kkvaks').doc(id).update({
      title: value.title,
      para1: value.para1,
      para2: value.para2,
      para3: value.para3,
      author: value.author
    });
  }

  //CRUD Kkvids
  createKkvid(value){
    return this.db.collection('Kkvids').add({
      vidurl: value.vidurl,
      date: Date.now()
    });
  }
  deleteKkvid(id){
    return this.db.collection('Kkvids').doc(id).delete();
  }
  getAllKkvids(){
    return this.db.collection('Kkvids',ref => ref.orderBy('date', 'desc')).snapshotChanges();
  }

  //CRUD News
  createNews(value){
    return this.db.collection('news').add({
      headline: value.headline,
      imgurl: value.imgurl,
      content: value.content,
      delref: value.delref,
      date: Date.now()
    });
  }
  deleteNews(id){
    this.getNews(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete();
    })
    return this.db.collection('news').doc(id).delete();
  }
  getAllNews(){
    return this.db.collection('news',ref => ref.orderBy('date', 'desc')).snapshotChanges();
  }
  getLatestNews(){
    return this.db.collection('news',ref => ref.orderBy('date', 'desc').limit(5)).snapshotChanges();
  }
  getNews(id){
    return this.db.collection('news').doc(id).snapshotChanges();
  }
  updateNews(id, value){
    alert('News Updated successfully');
    return this.db.collection('news').doc(id).update({
      headline: value.headline,
      imgurl: value.imgurl,
      content: value.content,
      delref: value.delref
    });
  }

  //CRUD New Member
  createNewMember(value){
    return this.db.collection('newMembers').add(value);
  }
  deletenewMember(id){
    return this.db.collection('newMembers').doc(id).delete();
  }
  getnewMembers(){
    return this.db.collection('newMembers',ref => ref.orderBy('date', 'desc')).snapshotChanges();
  }
  getnewMember(id){
    return this.db.collection('newMembers').doc(id).snapshotChanges();
  }

  //CRUD Events
  createEvent(value){
    return this.db.collection('Events').add({
      title: value.title,
      imgurl: value.imgurl,
      description: value.description,
      delref: value.delref,
      date: Date.now()
    });
  }
  deleteEvent(id){
    this.getEvent(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete()
    });
    return this.db.collection('Events').doc(id).delete();
  }
  getAllEvents(){
    return this.db.collection('Events',ref => ref.orderBy('date', 'desc')).snapshotChanges();
  }
  getLatestEvents(){
    return this.db.collection('Events',ref => ref.orderBy('date', 'desc').limit(5)).snapshotChanges();
  }
  getEvent(id){
    return this.db.collection('Events').doc(id).snapshotChanges();
  }
  updateEvent(id, value){
    alert('Event Updated successfully');
    return this.db.collection('Events').doc(id).update({
      title: value.title,
      imgurl: value.imgurl,
      description: value.description,
      delref: value.delref
    });
  }

  //CRUD Zones
  createZone(value){
    return this.db.collection('Zones').add(value);
  }
  deleteZone(id){
    this.getZone(id).subscribe(ad=>{
      let delref=ad.payload.data()['delref'];
      let mref1=ad.payload.data()['mref1'];
      let mref2=ad.payload.data()['mref2'];
      let mref3=ad.payload.data()['mref3'];
      let ref1: AngularFireStorageReference = this.afs.ref(delref);
      let ref2: AngularFireStorageReference = this.afs.ref(mref1);
      let ref3: AngularFireStorageReference = this.afs.ref(mref2);
      let ref4: AngularFireStorageReference = this.afs.ref(mref3);
      ref1.delete();ref2.delete();ref3.delete();ref4.delete();
    });
    return this.db.collection('Zones').doc(id).delete();
  }
  getAllZones(){
    return this.db.collection('Zones').snapshotChanges();
  }
  getZone(id){
    return this.db.collection('Zones').doc(id).snapshotChanges();
  }
  updateZone(id, value){
    return this.db.collection('Zones').doc(id).set(value);
  }

  //PHOTOS
  createPhoto(value){
    return this.db.collection('photos').add({
      imgurl:value.imgurl,
      delref:value.delref,
      title:value.title,
      date: Date.now()
    })
  }
  deletePhoto(id){
    this.getPhoto(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete();
    })
    return this.db.collection('photos').doc(id).delete();
  }
  getAllPhotos(){
    return this.db.collection('photos',ref => ref.orderBy('date', 'desc')).snapshotChanges();
  }
  getPhoto(id){
    return this.db.collection('photos').doc(id).snapshotChanges();
  }

  //VIDEOS
  createVideo(value){
    return this.db.collection('videos').add({
      vidurl:value.vidurl,
      title:value.title,
      date: Date.now()
    })
  }
  deleteVideo(id){
    return this.db.collection('videos').doc(id).delete();
  }
  getAllVideos(){
    return this.db.collection('videos',ref => ref.orderBy('date', 'desc')).snapshotChanges();
  }
  
  //CRUD Activities
  createActivity(value){
    return this.db.collection('Activities').add({
      title: value.title,
      imgurl: value.imgurl,
      description: value.description,
      delref: value.delref,
      date: Date.now()
    });
  }
  deleteActivity(id){
    this.getActivity(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete()
    });
    return this.db.collection('Activities').doc(id).delete();
  }
  getAllActivities(){
    return this.db.collection('Activities',ref => ref.orderBy('date', 'desc')).snapshotChanges();
  }
  getLatestActivities(){
    return this.db.collection('Activities',ref => ref.orderBy('date', 'desc').limit(5)).snapshotChanges();
  }
  getActivity(id){
    return this.db.collection('Activities').doc(id).snapshotChanges();
  }
  updateActivity(id, value){
    alert('Activity Updated successfully');
    return this.db.collection('Activities').doc(id).update({
      title: value.title,
      imgurl: value.imgurl,
      description: value.description,
      delref: value.delref
    });
  }

  //CRUD CenterAds
  createCenterAd(value){
    return this.db.collection('CenterAds').add(value);
  }
  deleteCenterAd(id){
    this.getCenterAd(id).subscribe(ad=>{
      let img1=ad.payload.data()['delref1'];
      let img2=ad.payload.data()['delref2'];
      let img3=ad.payload.data()['delref3'];
      let ref1: AngularFireStorageReference = this.afs.ref(img1);
      let ref2: AngularFireStorageReference = this.afs.ref(img2);
      let ref3: AngularFireStorageReference = this.afs.ref(img3);
      ref1.delete();ref2.delete();ref3.delete();
      return this.db.collection('CenterAds').doc(id).delete();
    })
  }
  getCenterAds(){
    return this.db.collection('CenterAds').snapshotChanges();
  }
  getCenterAd(id){
    return this.db.collection('CenterAds').doc(id).snapshotChanges();
  }
  updateCenterAd(id, value){
    console.log(value);
    return this.db.collection('CenterAds').doc(id).set(value);
  }

  //CRUD TallAds
  createTallAd(value){
    return this.db.collection('TallAds').add(value);
  }
  deleteTallAd(id){
    this.getTallAd(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete();
      return this.db.collection('TallAds').doc(id).delete();
    })
  }
  getTallAds(){
    return this.db.collection('TallAds').snapshotChanges();
  }
  getTallAd(id){
    return this.db.collection('TallAds').doc(id).snapshotChanges();
  }
  updateTallAd(id, value){
    return this.db.collection('TallAds').doc(id).set(value);
  }

  //CRUD FooterAds
  createFooterAd(value){
    return this.db.collection('FooterAds').add(value);
  }
  deleteFooterAd(id){
    this.getFooterAd(id).subscribe(ad=>{
      let img1=ad.payload.data()['delref1'];
      let img2=ad.payload.data()['delref2'];
      let img3=ad.payload.data()['delref3'];
      let ref1: AngularFireStorageReference = this.afs.ref(img1);
      let ref2: AngularFireStorageReference = this.afs.ref(img2);
      let ref3: AngularFireStorageReference = this.afs.ref(img3);
      ref1.delete();ref2.delete();ref3.delete();
      return this.db.collection('FooterAds').doc(id).delete();
    })
  }
  getFooterAds(){
    return this.db.collection('FooterAds').snapshotChanges();
  }
  getFooterAd(id){
    return this.db.collection('FooterAds').doc(id).snapshotChanges();
  }
  updateFooterAd(id, value){
    return this.db.collection('FooterAds').doc(id).set(value);
  }

  //CRUD Donations
  createDonation(value){
    return this.db.collection('Donations').add({
      name: value.name,
      description: value.description,
      address: value.address,
      imgurl: value.imgurl,
      delref: value.delref,
      date: Date.now()
    });
  }
  deleteDonation(id){
    this.getDonation(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete()
    });
    return this.db.collection('Donations').doc(id).delete();
  }
  getAllDonations(){
    return this.db.collection('Donations',ref => ref.orderBy('date', 'desc')).snapshotChanges();
  }
  getDonation(id){
    return this.db.collection('Donations').doc(id).snapshotChanges();
  }
  updateDonation(id, value){
    alert('Donation Updated successfully');
    return this.db.collection('Donations').doc(id).update({
      name: value.name,
      description: value.description,
      address: value.address,
      imgurl: value.imgurl,
      delref: value.delref
    });
  }


  // CRUD MahilaSamitis
  addMahilaSamiti(value){
    return this.db.collection('MahilaSamitis').add(value);
  }
  updateMahilaSamiti(id, value){
    alert('Member Updated successfully');
    return this.db.collection('MahilaSamitis').doc(id).set(value);
  }
  getMahilaSamitis(){
    return this.db.collection('MahilaSamitis',ref => ref.orderBy('rank')).snapshotChanges();
  }
  getMahilaSamiti(id){
    return this.db.collection('MahilaSamitis').doc(id).snapshotChanges();
  }
  deleteMahilaSamiti(id){
    this.getMahilaSamiti(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete();
    })
    return this.db.collection('MahilaSamitis').doc(id).delete();
  }

  // CRUD National Body
  addNationalBody(value){
    return this.db.collection('NationalBodys').add(value);
  }
  updateNationalBody(id, value){
    alert('Member Updated successfully');
    return this.db.collection('NationalBodys').doc(id).set(value);
  }
  getNationalBodys(){
    return this.db.collection('NationalBodys',ref => ref.orderBy('rank')).snapshotChanges();
  }
  getNationalBody(id){
    return this.db.collection('NationalBodys').doc(id).snapshotChanges();
  }
  deleteNationalBody(id){
    this.getNationalBody(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete();
    })
    return this.db.collection('NationalBodys').doc(id).delete();
  }

  // CRUD Zonal Body
  addZonalBody(value){
    return this.db.collection('ZonalBodys').add(value);
  }
  updateZonalBody(id, value){
    alert('Member Updated successfully');
    return this.db.collection('ZonalBodys').doc(id).set(value);
  }
  getZonalBodys(value){
    return this.db.collection('ZonalBodys',ref => ref.orderBy('rank').where('position', '==', value)).snapshotChanges();
  }
  getAllZonalBodys(){
    return this.db.collection('ZonalBodys',ref => ref.orderBy('rank')).snapshotChanges();
  }
  getZonalBody(id){
    return this.db.collection('ZonalBodys').doc(id).snapshotChanges();
  }
  deleteZonalBody(id){
    this.getZonalBody(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete();
    })
    return this.db.collection('ZonalBodys').doc(id).delete();
  }
  
  // CRUD Directory
  addDirectory(value){
    return this.db.collection('Directorys').add(value);
  }
  updateDirectory(id, value){
    alert('Entry Updated successfully');
    return this.db.collection('Directorys').doc(id).set(value);
  }
  getDirectory(id){
    return this.db.collection('Directorys').doc(id).snapshotChanges();
  }
  getDirectorys(){
    return this.db.collection('Directorys',ref => ref.orderBy('date','desc')).snapshotChanges();
  }
  getDirectorysAlphabetically(){
    return this.db.collection('Directorys',ref => ref.orderBy('name')).snapshotChanges();
  }
  deleteDirectory(id){
    return this.db.collection('Directorys').doc(id).delete();
  }

  // CRUD GoverningBodys
  addGoverningBody(value){
    return this.db.collection('GoverningBodys').add(value);
  }
  updateGoverningBody(id, value){
    alert('Governing Body Updated successfully');
    return this.db.collection('GoverningBodys').doc(id).set(value);
  }
  getGoverningBodys(){
    return this.db.collection('GoverningBodys').snapshotChanges();
  }
  getGoverningBody(id){
    return this.db.collection('GoverningBodys').doc(id).snapshotChanges();
  }
  deleteGoverningBody(id){
    this.getGoverningBody(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete().subscribe(res =>{
        console.log(res);
      }, error =>{ 
        console.log(error)
      });
    })
    return this.db.collection('GoverningBodys').doc(id).delete();
  }

  // CRUD SanrakshakSadasyas
  addSanrakshakSadasya(value){
    return this.db.collection('SanrakshakSadasyas').add(value);
  }
  updateSanrakshakSadasya(id, value){
    alert('Sanrakshak Sadasya Updated successfully');
    return this.db.collection('SanrakshakSadasyas').doc(id).set(value);
  }
  getSanrakshakSadasyas(){
    return this.db.collection('SanrakshakSadasyas',ref => ref.orderBy('rank')).snapshotChanges();
  }
  getSanrakshakSadasya(id){
    return this.db.collection('SanrakshakSadasyas').doc(id).snapshotChanges();
  }
  deleteSanrakshakSadasya(id){
    this.getSanrakshakSadasya(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete().subscribe(res =>{
        console.log(res);
      }, error =>{ 
        console.log(error)
      });
    })
    return this.db.collection('SanrakshakSadasyas').doc(id).delete();
  }

  // CRUD Presidents
  addPresident(value){
    return this.db.collection('Presidents').add(value);
  }
  updatePresident(id, value){
    alert('President Updated successfully');
    return this.db.collection('Presidents').doc(id).set(value);
  }
  getPresidents(){
    return this.db.collection('Presidents',ref => ref.orderBy('rank')).snapshotChanges();
  }
  getPresident(id){
    return this.db.collection('Presidents').doc(id).snapshotChanges();
  }
  deletePresident(id){
    this.getPresident(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete().subscribe(res =>{
        console.log(res);
      }, error =>{ 
        console.log(error)
      });
    })
    return this.db.collection('Presidents').doc(id).delete();
  }

  // CRUD VicePresidents
  addVicePresident(value){
    return this.db.collection('VicePresidents').add(value);
  }
  updateVicePresident(id, value){
    alert('Vice President Updated successfully');
    return this.db.collection('VicePresidents').doc(id).set(value);
  }
  getVicePresidents(){
    return this.db.collection('VicePresidents',ref => ref.orderBy('rank')).snapshotChanges();
  }
  getVicePresident(id){
    return this.db.collection('VicePresidents').doc(id).snapshotChanges();
  }
  deleteVicePresident(id){
    this.getVicePresident(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete().subscribe(res =>{
        console.log(res);
      }, error =>{ 
        console.log(error)
      });
    })
    return this.db.collection('VicePresidents').doc(id).delete();
  }

  // CRUD Secretarys
  addSecretary(value){
    return this.db.collection('Secretarys').add(value);
  }
  updateSecretary(id, value){
    alert('Secretary Updated successfully');
    return this.db.collection('Secretarys').doc(id).set(value);
  }
  getSecretarys(){
    return this.db.collection('Secretarys',ref => ref.orderBy('rank')).snapshotChanges();
  }
  getSecretary(id){
    return this.db.collection('Secretarys').doc(id).snapshotChanges();
  }
  deleteSecretary(id){
    this.getSecretary(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete().subscribe(res =>{
        console.log(res);
      }, error =>{ 
        console.log(error)
      });
    })
    return this.db.collection('Secretarys').doc(id).delete();
  }

  // CRUD JointSecretarys
  addJointSecretary(value){
    return this.db.collection('JointSecretarys').add(value);
  }
  updateJointSecretary(id, value){
    alert('Joint Secretary Updated successfully');
    return this.db.collection('JointSecretarys').doc(id).set(value);
  }
  getJointSecretarys(){
    return this.db.collection('JointSecretarys',ref => ref.orderBy('rank')).snapshotChanges();
  }
  getJointSecretary(id){
    return this.db.collection('JointSecretarys').doc(id).snapshotChanges();
  }
  deleteJointSecretary(id){
    this.getJointSecretary(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete().subscribe(res =>{
        console.log(res);
      }, error =>{ 
        console.log(error)
      });
    })
    return this.db.collection('JointSecretarys').doc(id).delete();
  }

  // CRUD Treasurers
  addTreasurer(value){
    return this.db.collection('Treasurers').add(value);
  }
  updateTreasurer(id, value){
    alert('Treasurer Updated successfully');
    return this.db.collection('Treasurers').doc(id).set(value);
  }
  getTreasurers(){
    return this.db.collection('Treasurers',ref => ref.orderBy('rank')).snapshotChanges();
  }
  getTreasurer(id){
    return this.db.collection('Treasurers').doc(id).snapshotChanges();
  }
  deleteTreasurer(id){
    this.getTreasurer(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete().subscribe(res =>{
        console.log(res);
      }, error =>{ 
        console.log(error)
      });
    })
    return this.db.collection('Treasurers').doc(id).delete();
  }

  // CRUD Pros
  addPro(value){
    return this.db.collection('Pros').add(value);
  }
  updatePro(id, value){
    alert('Pro Updated successfully');
    return this.db.collection('Pros').doc(id).set(value);
  }
  getPros(){
    return this.db.collection('Pros',ref => ref.orderBy('rank')).snapshotChanges();
  }
  getPro(id){
    return this.db.collection('Pros').doc(id).snapshotChanges();
  }
  deletePro(id){
    this.getPro(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete().subscribe(res =>{
        console.log(res);
      }, error =>{ 
        console.log(error)
      });
    })
    return this.db.collection('Pros').doc(id).delete();
  }

  // CRUD ExecutiveMemberss
  addExecutiveMembers(value){
    return this.db.collection('ExecutiveMemberss').add(value);
  }
  updateExecutiveMembers(id, value){
    alert('Executive Member Updated successfully');
    return this.db.collection('ExecutiveMemberss').doc(id).set(value);
  }
  getExecutiveMemberss(){
    return this.db.collection('ExecutiveMemberss',ref => ref.orderBy('rank')).snapshotChanges();
  }
  getExecutiveMembers(id){
    return this.db.collection('ExecutiveMemberss').doc(id).snapshotChanges();
  }
  deleteExecutiveMembers(id){
    this.getExecutiveMembers(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      if(img){
        let ref: AngularFireStorageReference = this.afs.ref(img);
        ref.delete().subscribe(res =>{
          console.log(res);
        }, error =>{ 
          console.log(error)
        });
      }
    })
    return this.db.collection('ExecutiveMemberss').doc(id).delete();
  }

  // CRUD AnushashanSamitis
  addAnushashanSamiti(value){
    return this.db.collection('AnushashanSamitis').add(value);
  }
  updateAnushashanSamiti(id, value){
    alert('Member Updated successfully');
    return this.db.collection('AnushashanSamitis').doc(id).set(value);
  }
  getAnushashanSamitis(){
    return this.db.collection('AnushashanSamitis',ref => ref.orderBy('rank')).snapshotChanges();
  }
  getAnushashanSamiti(id){
    return this.db.collection('AnushashanSamitis').doc(id).snapshotChanges();
  }
  deleteAnushashanSamiti(id){
    this.getAnushashanSamiti(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete().subscribe(res =>{
        console.log(res);
      }, error =>{ 
        console.log(error)
      });
    })
    return this.db.collection('AnushashanSamitis').doc(id).delete();
  }

  // CRUD SadasyataVikasSamitis
  addSadasyataVikasSamiti(value){
    return this.db.collection('SadasyataVikasSamitis').add(value);
  }
  updateSadasyataVikasSamiti(id, value){
    alert('Member Updated successfully');
    return this.db.collection('SadasyataVikasSamitis').doc(id).set(value);
  }
  getSadasyataVikasSamitis(){
    return this.db.collection('SadasyataVikasSamitis',ref => ref.orderBy('rank')).snapshotChanges();
  }
  getSadasyataVikasSamiti(id){
    return this.db.collection('SadasyataVikasSamitis').doc(id).snapshotChanges();
  }
  deleteSadasyataVikasSamiti(id){
    this.getSadasyataVikasSamiti(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete().subscribe(res =>{
        console.log(res);
      }, error =>{ 
        console.log(error)
      });
    })
    return this.db.collection('SadasyataVikasSamitis').doc(id).delete();
  }

  // CRUD MediaPrabhandans
  addMediaPrabhandan(value){
    return this.db.collection('MediaPrabhandans').add(value);
  }
  updateMediaPrabhandan(id, value){
    alert('Member Updated successfully');
    return this.db.collection('MediaPrabhandans').doc(id).set(value);
  }
  getMediaPrabhandans(){
    return this.db.collection('MediaPrabhandans',ref => ref.orderBy('rank')).snapshotChanges();
  }
  getMediaPrabhandan(id){
    return this.db.collection('MediaPrabhandans').doc(id).snapshotChanges();
  }
  deleteMediaPrabhandan(id){
    this.getMediaPrabhandan(id).subscribe(ad=>{
      let img=ad.payload.data()['delref'];
      let ref: AngularFireStorageReference = this.afs.ref(img);
      ref.delete().subscribe(res =>{
        console.log(res);
      }, error =>{ 
        console.log(error)
      });
    })
    return this.db.collection('MediaPrabhandans').doc(id).delete();
  }
}