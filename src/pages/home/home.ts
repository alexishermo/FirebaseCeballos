import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { FirebaseListObservable, AngularFireDatabase} from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  listado: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public database:AngularFireDatabase) {
    this.listado=this.database.list('/movies');

    /*this.listado.push({
      title:'Hera de hielo',
      opinion:'Gran pelicula'
    });

    this.listado.push({
      title:'Mi villano favorito',
      opinion:'Pelicula muy divertida'
    });

    this.listado.push({
      title:'Cars',
      opinion:'Gran pelicula'
    });*/
  }

  insertarPeli(){
     this.listado.push({
      title:'PERROS ESPACIALES',
      opinion:'NO SE'
    });
  }

}
