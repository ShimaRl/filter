import { Component } from '@angular/core';
//import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { AngularFireDatabase } from '@angular/fire/database';
import {FirebaseListObservable, FirebaseObjectObservable} from '@angular/fire/database-deprecated';
import { Apparel } from './apparel/apparel.model';
import { filter } from 'rxjs/operators';

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

  get(path): Observable<any[]> {
    return this.db.list(path).valueChanges();
  }


  onSizeChange(event){
    this.conditions.push({key: "shape", value: event.target.value});
    this.onChange();   
  }

  onDesignerChange(event){
    if(event.target.value != ""){
      this.conditions.push({key: "designer", value: event.target.value});
      this.onChange();     
    }
  }

  onChange(){
    //this.list.pipe(filter()).subscribe();
  }

}


      //this.list = this.db.collection('/Apparel', ref => ref.where(element.key, "==", element.value)).valueChanges();
