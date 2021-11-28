import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {Page403Component} from "./page403/page403.component";
import {Page404NotfoundComponent} from "./page404-notfound/page404-notfound.component";

const routes: Routes = [
  {path: "403", component: Page403Component},
  {path: 'not-found', component: Page404NotfoundComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShareRoutingModule {
}
