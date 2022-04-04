import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
	favoritos= []
	sup = {}
  constructor(private route: ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController,
              private platform: Platform,) {
                // this.db.createDatabase()
                  // .then(()=>this.cargarHeroesFavoritos());
                this.platform.ready().then(()=>{
                  this.db.createDatabase().then(()=>{
                    this.cargarHeroesFavoritos();
                  })
                })
                // this.cargarHeroesFavoritos();
              }

  ngOnInit() {
	// console.log(this.db.getDatabaseState());
	// console.log(this.db.isReady());
	// this.db.createDB()
	// // db2=new DatabaseService()
    // this.db.getDatabaseState().subscribe(rdy => {
      // if (rdy) {console.log("readyyy")
				// this.db.seedDatabase()
        // this.db.getSups().subscribe(sups => {
		// console.log(sups)
          // this.supers = sups;
        // })
      // }
    // });
  }
	
	borrar(id) {
	// console.log(id)
		// this.db.deleteSuper(id).then(() => {
			// this.router.navigateByUrl('/');
    // });
	this.db.newSup("hola",1)
  }

  cargarHeroesFavoritos(){
    this.db.getHeroes().then((data) => {
      this.favoritos=[]
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.favoritos.push(data.rows.item(i));
        }
      }
    })
  }


}



