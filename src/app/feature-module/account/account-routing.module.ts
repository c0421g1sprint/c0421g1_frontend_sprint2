import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {EditPasswordComponent} from "./edit-password/edit-password.component";
import {AccountComponent} from "./account.component";

const routes: Routes = [
  {path: ":name", component: UserDetailComponent},
  {path: "editPass/:name", component: EditPasswordComponent},
  {path: 'login', component: AccountComponent}
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class AccountRoutingModule {
}
