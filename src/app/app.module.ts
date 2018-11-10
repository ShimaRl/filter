import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ApparelComponent } from './apparel/apparel.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { FirebaseConfig } from '../environments/firebase.config';
import { AngularFireDatabase } from '@angular/fire/database-deprecated';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-router.module';


@NgModule({
  declarations: [
    AppComponent,
    ApparelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(FirebaseConfig.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
