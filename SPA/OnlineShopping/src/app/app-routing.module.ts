import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ProductComponent} from "./product/product.component";
import {CanActivateGuard} from "./can-activate.guard";
import {ShoppingComponent} from "./shopping/shopping.component";
import {CartComponent} from "./cart/cart.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {AdminGuard} from "./admin.guard";

const routes: Routes = [{path: 'login', component: LoginComponent},
                        {path: 'signup', component: SignupComponent},
                        {path: 'product', component: ProductComponent, canActivate:[CanActivateGuard]},
                        {path: 'shopping', component: ShoppingComponent, canActivate:[CanActivateGuard]},
                        {path: 'cart', component: CartComponent, canActivate:[CanActivateGuard]},
                        {path: 'add-product', component: AddProductComponent, canActivate:[CanActivateGuard, AdminGuard]},
                        {path: '*', component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
