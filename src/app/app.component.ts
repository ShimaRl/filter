import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseListObservable, FirebaseObjectObservable } from '@angular/fire/database-deprecated';
import { Apparel } from './apparel/apparel.model';
import { filter, concat } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) { }

  // observables
  apparels: any;
  filteredApparels: any;

  // filter array
  sizes = ['small', 'medium' , 'large'];
designers = ['ralph', 'gap', 'nike', 'gucci'];
  // filter arrays
  selectedDesigners: string[] = []; // array of checked disigners
  selectedSizes: string[] = []; // array of checked sizes
  selectedMinPrice: number; // min price
  selectedMaxPrice: number; // max price

  // temp number
  changesNum: number;

  ngOnInit() {
    // fetching data from database
    this.db.list('/apparel').valueChanges().subscribe(apparels => {
      this.apparels = apparels;
      this.getParamsFromUrl();
      this.search();
    });
    this.changesNum = 0;
  }

  getParamsFromUrl() {
    // reading query parameters from url
    this.route.queryParamMap.subscribe((params) => {
      if (params.has('designer')) {
        this.selectedDesigners = params.get('designer').split(',');
      }
      if (params.has('size')) {
        this.selectedSizes = params.get('size').split(',');
      }
      if (params.has('minprice')) {
        this.selectedMinPrice = +params.get('minprice') || 0;
      }
      if (params.has('maxprice')) {
        this.selectedMaxPrice = +params.get('maxprice') || 0;
      }
    });
  }

  search() {
    // searching based on selected filters
    this.filteredApparels = this.apparels
    .filter(x => this.setFilter(this.selectedDesigners, x.designer))
    .filter(x => this.setFilter(this.selectedSizes, x.shape))
    .filter(x => this.setPriceFilter(this.selectedMinPrice, this.selectedMaxPrice, x.price))
    ;
  }

  // returning true or false based on filter array values
  setFilter(array: string[], value: string): boolean {
    if (array.length > 0) {
      return array.includes(value);
    } else {
      return true;
    }
  }
  // returning true or false based on min and max values
  setPriceFilter(min: number, max: number, value: number): boolean {
    if (min === 0) {
      min = undefined;
    }
    if (max === 0) {
      max = undefined;
    }
    if (min !== undefined && max !== undefined && max > min) {
      return min <= value && max >= value;
    } else if (min !== undefined && max === undefined) {
      return min <= value;
    } else if (min === undefined && max !== undefined) {
      return max >= value;
    } else {
      return true;
    }
  }

  onSizeChanged(event) {
    // managing size filter array
    if (event.target.checked) {
      this.selectedSizes.push(event.target.value);
    } else {
      this.selectedSizes.splice(this.selectedSizes.indexOf(event.target.value), 1);
    }
    // adding query parameters to url
    if (this.selectedSizes.length > 0) {
      // if at least one size has been selected then add them to query params
      this.router.navigate([], {relativeTo: this.route, queryParams: {size: [this.selectedSizes], num: this.changesNum++},
        queryParamsHandling: 'merge'});
    } else {
      // if no size has been selected then delete 'size' from query params
      this.router.navigate([], {relativeTo: this.route, queryParams: {size: null, num: this.changesNum++},
        queryParamsHandling: 'merge'});
    }
    // searching based on new filters
    this.search();
  }

  onDesignerChanged(event) {
    // managing designer filter array
    if (event.target.checked) {
      this.selectedDesigners.push(event.target.value);
    } else {
      this.selectedDesigners.splice(this.selectedDesigners.indexOf(event.target.value), 1);
    }
    // adding query parameters to url
    if (this.selectedDesigners.length > 0) {
      // if at least one designer has been selected then add them to query params
      this.router.navigate([], {relativeTo: this.route, queryParams: {designer: [this.selectedDesigners], num: this.changesNum++},
        queryParamsHandling: 'merge'});
    } else {
      // if no designer has been selected then delete 'designer' from query params
      this.router.navigate([], {relativeTo: this.route, queryParams: {designer: null, num: this.changesNum++},
        queryParamsHandling: 'merge'});
    }
    // searching based on new filters
    this.search();
  }

  onPriceChanged(min, max) {
    // managing min and max price
    this.selectedMinPrice = +min.value;
    this.selectedMaxPrice = +max.value;

    // adding query parameters to url
    if (this.selectedMinPrice !== 0 && this.selectedMaxPrice !== 0) {

      this.router.navigate([], {relativeTo: this.route,
      queryParams: {'minprice': this.selectedMinPrice, 'maxprice': this.selectedMaxPrice,
      num: this.changesNum++}, queryParamsHandling: 'merge'});

    } else if (this.selectedMinPrice !== 0 && this.selectedMaxPrice === 0) {

      this.router.navigate([], {relativeTo: this.route,
      queryParams: {'minprice': this.selectedMinPrice, 'maxprice': null,
      num: this.changesNum++}, queryParamsHandling: 'merge'});

    } else if (this.selectedMinPrice === 0 && this.selectedMaxPrice !== 0) {

      this.router.navigate([], {relativeTo: this.route,
      queryParams: {'minprice': null, 'maxprice': this.selectedMaxPrice,
      num: this.changesNum++}, queryParamsHandling: 'merge'});

    }
    // searching based on new filters
    this.search();
   }
}

