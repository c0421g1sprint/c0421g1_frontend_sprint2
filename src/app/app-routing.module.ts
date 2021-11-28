import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuComponent} from "./feature-module/order/menu/menu.component";
import {CartComponent} from "./feature-module/cart/cart.component";


const routes: Routes = [
  {path: 'menu', component: MenuComponent,},
  {path: 'menu/cart', component: CartComponent},
  {path: '**', redirectTo: "/not-found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
