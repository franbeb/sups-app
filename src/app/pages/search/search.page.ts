import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { Injectable } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private http: HttpClient) { }
	
	results=[]
	resultsById={}
	foundById = false
  ngOnInit() {
  }

	buscando(event){
	console.log("https://superheroapi.com/api.php/10219381517358603/search/"+event.detail.value)
	this.http.get<any>("https://superheroapi.com/api.php/10219381517358603/search/"+event.detail.value)
	.subscribe(res =>{
	console.log(res);
	this.results = res.results;
	})
	this.http.get<any>("https://superheroapi.com/api.php/10219381517358603/"+event.detail.value)
	.subscribe(resi =>{
	this.resultsById = resi;
	if (resi.error){this.foundById = false}else{this.foundById = true}
	console.log(this.resultsById);
	console.log(this.foundById);
	})
	// this.http.get<Object>(
      // "https://superheroapi.com/api/10219381517358603/search/"+event.detail.value)
	// https://superheroapi.com/api/10219381517358603/search/name
	// 10219381517358603
	}

}
