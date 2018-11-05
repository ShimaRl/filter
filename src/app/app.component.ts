import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFireDatabase } from '@angular/fire/database';
import {FirebaseListObservable, FirebaseObjectObservable} from '@angular/fire/database-deprecated';
import { Apparel } from './apparel/apparel.model';
import { filter, reduce, map, zip, concat, merge } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private db: AngularFireDatabase){}

  apparels: any;
  filteredApparels: any;

  filters: {key: string, val: any}[] =[];

  checkboxObservable: any;
  checkCount: number;

  ngOnInit(){
    this.db.list('/apparel').valueChanges().subscribe(apparels => {
      this.apparels = apparels;
      this.applyFilters();
    });
    this.checkCount = 0;
  }

  onCheckboxChanged(event){

    var key = event.target.parentElement.parentElement.parentElement.id;
    var value = event.target.value;

    if(!event.target.checked){// age check bardashte shod
      this.checkCount--;
      if(this.checkCount != 0){//age hanooz checkboxi vojood dare ke checked hast
        this.checkboxObservable = this.checkboxObservable.filter(x => x[key] != value);
      }else{//age hameye checkboxa unchecked hastan
        this.checkboxObservable = null;
      }
    }else{//age check gozashte shod
      this.checkCount++;
      var o = this.apparels.filter(x => x[key] == value);//filtere kole dadeha bar asase checkboxe check shode     
      if(this.checkboxObservable != null){//age az ghabl ham check boxe check shodei bood
        var w =this.checkboxObservable;
        this.checkboxObservable = this.checkboxObservable.concat(o);//ezafe kardan be ghablia
      }else{
        this.checkboxObservable = o;
      }
    }
    this.applyFilters();
  }

  onDropdownChanged(event) {
    var key = event.target.id;
    var value = event.target.value;
    
    if(value != ""){//age ye filter entekhab shod 
      let index = this.filters.findIndex(i => i.key == key);
      if(index != -1){//age filtere ba in key az ghabl vojood dasht
        this.removeFilter(key);
      }
      this.filters.push({//ezafe kardane filtere jadid be araye filterha
        key: key,
        val: value
      });
    }else{//age bardashtane filter entekhab shod 
      this.removeFilter(key);      
    }
    
    this.applyFilters();
  }

  onPriceSet(min, max){

    var key = 'price';

    if(min.value != "" && max.value != ""){//age ye filter entekhab shod 
      if(min.value < max.value){
        let index = this.filters.findIndex(i => i.key == key);
        if(index != -1){//age filtere ba in key az ghabl vojood dasht
          this.removeFilter(key);
          }
        this.filters.push({//ezafe kardane filtere jadid be araye filterha
          key: key,
          val: min.value + "*" + max.value
        });
      } 
    }else{//age bardashtane filter entekhab shod 
      this.removeFilter(key);      
    }
    this.applyFilters();
  }

  removeFilter(key: string) {
    let index = this.filters.findIndex(i => i.key == key);
    this.filters.splice(index, 1);
  }

  applyFilters(){
    if(this.checkboxObservable != null){//age hade aghal yeki az checkboxa checked bood
      this.filteredApparels = this.checkboxObservable;//emale filtere checkboxa
    }else{
      this.filteredApparels = this.apparels;
    }
    if(this.filters.length != 0){//emale baghie filterha (hame be gheir az checkboxa)
      this.filters.forEach(element => {
        if(element.val.includes("*")){
          var min = element.val.split("*")[0];
          var max = element.val.split("*")[1];          
          this.filteredApparels = this.filteredApparels.filter(x => x[element.key] >= min && x[element.key] <= max);
        }else{
          this.filteredApparels = this.filteredApparels.filter(x => x[element.key] == element.val);          
        }
      });
    }
  }

}

