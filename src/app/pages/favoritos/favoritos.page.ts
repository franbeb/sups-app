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
	supers: Sup[] = [];
	sup = {}
  constructor(private route: ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController) { }

  ngOnInit() {
	console.log(this.db.getDatabaseState());
	console.log(this.db.isReady());
	this.db.createDB()
	// db2=new DatabaseService()
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {console.log("readyyy")
				this.db.seedDatabase()
        this.db.getSups().subscribe(sups => {
		console.log(sups)
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
