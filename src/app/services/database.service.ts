import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
 
export interface Sup {
  id: number,
  name: string,

}
 
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject= null;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private ready: boolean= false;
 
  supers = new BehaviorSubject([]);
  
 
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
		while(true){console.log("platform ready")}
      this.sqlite.create({
        name: 'supers.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
  }
 createDB(){
		console.log("me siento ready:")
		console.log(this.ready)
		this.sqlite.create({
        name: 'supers.db',
        location: 'default'
      })
	  .then((db: SQLiteObject) => {
          this.database = db;
		  console.log("la voy a seedear");
          this.seedDatabase();
		  console.log("la seedie")
		});
 }
 
  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadSupers();
          this.dbReady.next(true);
		  this.ready= true
        })
        .catch(e => console.error(e));
    });
  }
 
  getDatabaseState() {
    return this.dbReady.asObservable();
  }  
  isReady() {
    return this.ready;
  }
 
  getSups(): Observable<Sup[]> {
    return this.supers.asObservable();
  }
 

loadSupers() {
    return this.database.executeSql('SELECT * FROM supers', []).then(data => {
      let supers: Sup[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
 
          supers.push({ 
            id: data.rows.item(i).id,
            name: data.rows.item(i).name, 
           });
        }
      }
      this.supers.next(supers);
    });
  }
 
  addSuper(id, name) {
    let data = [id, name];
    return this.database.executeSql('INSERT INTO developer (id,name) VALUES (?, ?)', data).then(data => {
      this.loadSupers();
    });
  }
 
  getSuper(id): Promise<Sup> {
    return this.database.executeSql('SELECT * FROM super WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id,
        name: data.rows.item(0).name, 
      }
    });
  }
 
  deleteSuper(id) {
    return this.database.executeSql('DELETE FROM developer WHERE id = ?', [id]).then(_ => {
      this.loadSupers();
    });
  }
 
  // updateDeveloper(dev: Dev) {
    // let data = [dev.name, JSON.stringify(dev.skills), dev.img];
    // return this.database.executeSql(`UPDATE developer SET name = ?, skills = ?, img = ? WHERE id = ${dev.id}`, data).then(data => {
      // this.loadDevelopers();
    // })
  }
