import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getHeader(){
    return { headers: new HttpHeaders({'x-access-token': this.authService.getToken()})};
  }

  getOptions(){
    return {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'x-access-token': this.authService.getToken()})
    };
  }

  getProducts(){
    return this.http.get<any>('http://localhost:3000/products', this.getHeader());
  }

  getProduct(prodName){
    return this.http.get<any>(`http://localhost:3000/products/${prodName}`, this.getHeader());
  }

  addProduct(prodName, prodPrice, prodDesc){
    let body = `name=${prodName}&price=${prodPrice}&description=${prodDesc}`;
    return this.http.post<any>('http://localhost:3000/products/', body, this.getOptions());
  }

  getCart(){
    return this.http.get<any>('http://localhost:3000/cart', this.getHeader());
  }

  addToCart(prodId){
    let body = `productId=${prodId}`;
    //console.log(prodId);
    return this.http.post<any>(`http://localhost:3000/cart/${prodId}`, body, this.getOptions());
  }

  removeFromCart(prodId){
    return this.http.delete<any>(`http://localhost:3000/cart/${prodId}`, this.getHeader());
  }

  checkout(){
    return this.http.post<any>('http://localhost:3000/cart/checkout', {}, this.getHeader());
  }

}
