import { Component } from '@angular/core';

import { NavController, Platform, AlertController } from 'ionic-angular';

import { FirebaseListObservable, AngularFireDatabase} from 'angularfire2';

import { NativeStorage } from 'ionic-native';


declare var navigator: any;
declare var Connection: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  listado: FirebaseListObservable<any>;
  items=[];

  constructor(public navCtrl: NavController, public database:AngularFireDatabase, private platform: Platform, private alertCtrl: AlertController) 
  {
    
    this.listado=this.database.list('/movies');
    
    NativeStorage.getItem('items').then(function (json) {
    let me = this;
    platform.ready().then(() => {
      NativeStorage.getItem('items').then(function (json) {
        if (json) {
          me.items = JSON.parse(json);
        }
      });
    });
  });
    
    /*this.listado.push({
      title:'Hera de hielo',
      opinion:'Gran pelicula'
    });*/
  
  }//constructor

  save() {
    NativeStorage.setItem('items', JSON.stringify(this.items));
  }//save

  addToDo(ti,op) {
    this.items.push({
      title: ti,
      opinion: op
    });
    
    this.save();
  }//addTodo



  insertarPeli(){
    
    this.platform.ready().then(() => {

            var networkState = navigator.connection.type;
            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            if(states[networkState]=='Unknown connection' || states[networkState]=='No network connection')
            {
              
              this.addToDo("PERROS ESPACIALES","NO SE");
              console.log('ITEM AGREGADO AL ARREGLO');
              console.log('DATOS: '+JSON.stringify(this.items.slice()));
              /*this.ts.openDatabase();
              console.log('!!BD ABIERTA!!');
              this.ts.createTable();
              console.log('!!TABLA CREADA!!');
              this.ts.create();
              console.log('!!INSERCION OFFLINE LOGRADA!!');
              console.log(JSON.stringify(this.ts.getAll()));
              
              NativeStorage.setItem('items',
              {
                title:'PERROS ESPACIALES',
                opinion:'NO SE'
              })
              .then(function(){
                console.log('No hay internet, pero se guardo');
              }, function (error) {
                console.log('No hay internet, existe un error: ' +  error);
              })*/

            }//if 

            else
            {
              if(!(this.items.length==0)){
                this.listado.push(this.items);
                console.log('ITEM AGREGADO A FIREBASE');
              }
                this.listado.push({
                title:'PERROS ESPACIALES 2',
                opinion:'NO SE 2'
                });
                
                this.items.length=0;           
            }//else
            
            let alert = this.alertCtrl.create({
                title: "Estado de conexion",
                subTitle: states[networkState],
                buttons: ["OK"]
            });
            alert.present(alert);
        });
  }//insertarPeli()

  getDatos(){
    NativeStorage.getItem("items")
              .then(function(){
                console.log('DATOS OBTENIDOS');
              }, function (error) {
                console.log('DATOS NO OBTENIDOS');
              })
  }

}//class
