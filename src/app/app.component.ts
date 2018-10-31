import { Component } from '@angular/core';
//import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { AngularFireDatabase } from '@angular/fire/database';
import {FirebaseListObservable, FirebaseObjectObservable} from '@angular/fire/database-deprecated';
import { Apparel } from './apparel/apparel.model';
import { filter } from 'rxjs/operators';
import { Key } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //apparelList: FirebaseListObservable<{color: string}[]>; //= this.db.database.list('apparel'); //this.db.collection('/Apparel');//AngularFirestoreCollection<any> = this.db.collection('/Apparel');
  list: Observable<any[]> = this.db.list('/apparel').valueChanges();//this.get('/apparel'); //this.apparelList.valueChanges();
  conditions: {key: string, value: string}[] = [];

  constructor(private db: AngularFireDatabase){}

  // get(path): Observable<any[]> {
  //   return this.db.list(path).valueChanges();
  // }


  onSizeChange(event){
    var key = event.target.parentElement.parentElement.parentElement.id;
    if(event.target.checked){
      this.conditions.push({key: key, value: event.target.value});
    }else{
      var index = this.conditions.findIndex(x => x.key == key && x.value == event.target.value);
      this.conditions.splice(index, 1);
    }
    this.onChange();   
  }

  onDesignerChange(event){
    var index = this.conditions.findIndex(x => x.key == event.target.id);
  
    if(index != -1 && event.target.value != ""){//agar filtere designer ghablan vojood dashte bashe va ye filtere jadid entekhab beshe
      this.conditions.splice(index, 1);
      this.conditions.push({key: event.target.id, value: event.target.value});
    }else if(index == -1 && event.target.value != ""){//agar filtere designer ghablan vojood nadashte va hala ye filter entekhab beshe
      this.conditions.push({key: event.target.id, value: event.target.value});
    }else if(index != -1 && event.target.value == ""){//agar filtere designer ghablan vojood dashte bashe va alan bardashte beshe
      this.conditions.splice(index, 1);
    }

    this.onChange();
  }

  onChange(){
    console.log(this.conditions);
    //this.list.pipe().subscribe();
  }

}


      //this.list = this.db.collection('/Apparel', ref => ref.where(element.key, "==", element.value)).valueChanges();
