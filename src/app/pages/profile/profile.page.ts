
import { HttpClient } from '@angular/common/http';

import { DatabaseService, Sup } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
	
	
	profileId: string;
	data={}
	biography=[]
	image=[]
	looks= []
	powers = []
	work = []

  constructor(
	private activatedRoute: ActivatedRoute,
	private http: HttpClient,
	private db: DatabaseService,
	private router: Router, private toast: ToastController) {}
	
  ngOnInit() {
	
	this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
	this.http.get<any>("https://superheroapi.com/api.php/10219381517358603/"+this.profileId)
	.subscribe(res =>{
	console.log(res);
	this.data = res;
	this.biography = this.data['biography'];
	this.image = this.data['image']
	this.looks = this.data['appearance']
	this.powers = this.data['powerstats']
	this.work = this.data['work']
	console.log(this.looks);
	})
  }
  ionChange(ev){
	console.log(ev.detail.checked);
	// if(ev.detail.checked){
		// this.db.addSuper(this.profileId,this.data['name'])
	// }else{
		// this.db.deleteSuper(this.profileId)
	// }
  
  
  }
  
  // ionChange(event){
	// console.log(event.detail.checked);
	// if (event.detail.checked){
		// this.db.addSuper(this.profileId,this.data['name']).then(() => {
			// this.router.navigateByUrl('/');}
	// }else{
		// this.db.deleteSuper(this.profileId).then(() => {
			// this.router.navigateByUrl('/');}
  // }
// }
}

