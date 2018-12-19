import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../redux/cart.state';
import {Observable} from "rxjs";
import {cart} from "../redux/cart.model";
import {DataService} from "../data.service";
import {Router} from "@angular/router";


import * as CartActions from '../redux/cart.actions';

@Component({
  selector: 'app-cart',
  template: `
    <div class="right" *ngIf="cart">
      <h3>Cart</h3>
      <ul>
        <li *ngFor="let c of cart | async; let i = index">
          {{ c.name }} - {{c.price}}
        </li>
      </ul>
      <button (click)="checkOut()">Check Out!</button>
    </div>
  `,
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Observable<cart[]>;
  constructor(private store: Store<State>, private dataService: DataService, private router: Router) {
    this.cart = store.pipe(select('cart'));
  }

  checkOut(){
    this.dataService.checkout()
      .subscribe(
        () => {
          console.log("Checkout Done");
          this.store.dispatch(new CartActions.EmptyCart());
          alert("Checkout Successful!")
          this.router.navigateByUrl('/shopping');
        }
      );
  }

  ngOnInit() {
  }

}
