import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<any>('http://localhost:3000/products');
  }

  getProduct(prodName){
    return this.http.get<any>(`http://localhost:3000/products/${prodName}`);
  }

  addProduct(prodName, prodPrice, prodDesc){
    let body = `name=${prodName}&price=${prodPrice}&description=${prodDesc}`;
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post<any>('http://localhost:3000/products/', body, options);
  }

  getCart(){
    return this.http.get<any>('http://localhost:3000/cart');
  }

  addToCart(prodId){
    return this.http.post<any>(`http://localhost:3000/cart/${prodId}`, {});
  }

  removeFromCart(prodId){
    return this.http.delete<any>(`http://localhost:3000/cart/${prodId}`, {});
  }

  checkout(){
    return this.http.post<any>('http://localhost:3000/cart/checkout', {});
  }

}
