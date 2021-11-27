import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from "./account.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {EditPasswordComponent} from "./edit-password/edit-password.component";

const routes: Routes = [
  {path: 'login', component: AccountComponent},
  {path: ":userName", component: UserDetailComponent},
  {path: "editPass/:name", component: EditPasswordComponent}
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
