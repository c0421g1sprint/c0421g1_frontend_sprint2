import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from "./account.component";
import {EditPasswordComponent} from "./edit-password/edit-password.component";
import {ForgetComponent} from "./forget/forget.component";

const routes: Routes = [
  {path: 'login', component: AccountComponent},
  {path: "editPass/:name", component: EditPasswordComponent},
  {path: "forget/refresh-password", component: ForgetComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
