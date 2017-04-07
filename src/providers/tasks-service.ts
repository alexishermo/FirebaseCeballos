import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';

@Injectable()
export class TasksService {

  db: SQLite = null;

  constructor() {
    console.log('Hello TasksService Provider');
    this.db = new SQLite();
  }

  openDatabase()
  {
      return this.db.openDatabase({
        name: 'data.db',
        location: 'default' // the location field is required
      });
  
  }//openDatabase

  createTable()
  {
    let sql = 'CREATE TABLE IF NOT EXISTS peliculas(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, opinion TEXT)';
    return this.db.executeSql(sql, []);
  
  }//createTable

  getAll()
  {
      let sql = 'SELECT * FROM peliculas';
      return this.db.executeSql(sql, [])
      .then(response => {
        let peliculas = [];
        for (let index = 0; index < response.rows.length; index++) {
          peliculas.push( response.rows.item(index) );
        }
        return Promise.resolve( peliculas );
      })
  }//getAll

  create()
  {
    let sql = 'INSERT INTO peliculas(title, opinion) VALUES(?,?)';
    return this.db.executeSql(sql, ['PERROS ESPACIALES', 'NO SE']);
  
  }//create
  
}//class
