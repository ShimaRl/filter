import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const appRoute: Routes = [
    {path: 'search', component: AppComponent}
];


@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ]
})
export class AppRoutingModule {

}
