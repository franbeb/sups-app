import { DatabaseService, Sup } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
	// supers: Sup[] = [];
	supers = [];
	sup = {}
  constructor(private route: ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController) { }


  
  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getSups().subscribe(sups => {
          this.supers = sups;
        })
      }
    });

  }
	
	borrar(id) {
	console.log(id)
		this.db.deleteSuper(id).then(() => {
			this.router.navigateByUrl('/');
    });
  }
}
