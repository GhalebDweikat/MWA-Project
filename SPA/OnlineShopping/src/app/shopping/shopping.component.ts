import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import { Store, select } from '@ngrx/store';
import {DataService} from "../data.service";
import {State} from "../redux/cart.state";

import * as CartActions from '../redux/cart.actions';

@Component({
  selector: 'app-shopping',
  template: `
    <p>
      Shopping Items:
    </p>
    <div *ngFor="let elem of products">
      <p>{{elem.name}}: {{elem.price}}</p>
      <button (click)="addCart(elem)">Add to Cart</button>
    </div>
    <br />
    <a [routerLink]="['../cart']">View Cart</a>
  `,
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  products;
  constructor(private dataService: DataService, private store: Store<State>) {
    dataService.getProducts().subscribe(e => {
      this.products = e.data.products;
      console.log(this.products);
    });
  }
  addCart(prod){
    this.dataService.addToCart(prod._id).subscribe(e=>console.log(e));
    this.addCartStore(prod);
    alert("Added to cart!");
  }

  addCartStore(item) {
    this.store.dispatch(new CartActions.AddCart(item));
  }

  ngOnInit() {
  }

}
