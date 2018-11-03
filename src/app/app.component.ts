import { Component, OnInit } from '@angular/core';
import { Observable, zip } from 'rxjs';

import { AngularFireDatabase } from '@angular/fire/database';
import {FirebaseListObservable, FirebaseObjectObservable} from '@angular/fire/database-deprecated';
import { Apparel } from './apparel/apparel.model';
import { filter, reduce, map } from 'rxjs/operators';
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private db: AngularFireDatabase){}

  apparels: any;
  filteredApparels: any;

  designer: string;
  small: boolean;
  medium: boolean;
  large: boolean;

  filters: {key: string, val: any}[] =[];

  ngOnInit(){
    this.db.list('/apparel').valueChanges().subscribe(apparels => {
      this.apparels = apparels;
      this.applyFilters();
    })
  }

  applyFilters(){

    this.filteredApparels = this.apparels;
    if(this.filters.length != 0){
      this.filters.forEach(element => {

        if(typeof(element.val) == 'string'){
            this.filteredApparels = this.filteredApparels.filter(x => x[element.key] == element.val);
        }else if(typeof(element.val) == 'boolean'){
          this.filteredApparels = this.filteredApparels.filter(x => x['shape'] == element.key);
        }
      });
    }
  }

  filterString(key: string, rule: any) {
    let index = this.filters.findIndex(i => i.key == key);
    if(index != -1){
      this.removeFilter(key);
    }
    this.filters.push({
      key: key,
      val: rule
    });
    this.applyFilters();
  }

  filterBoolean(key: string, rule: boolean) {
    if (!rule){
      this.removeFilter(key);
    }
    else {
      this.filters.push({
        key: key,
        val: rule
      });
    }
    this.applyFilters();
  }

  removeFilter(key: string) {
    let index = this.filters.findIndex(i => i.key == key);
    this.filters.splice(index, 1);
  }

}

