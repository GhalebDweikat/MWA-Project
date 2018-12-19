import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DataService} from "../data.service";

@Component({
  selector: 'app-add-product',
  template: `
    <form [formGroup]="form">
      <fieldset>
        <legend>Add Product</legend>
        <div class="form-field">
          <label>Name:</label>
          <input name="name" formControlName="name">
        </div>
        <div class="form-field">
          <label>Price:</label>
          <input name="price" formControlName="price">
        </div>
        <div class="form-field">
          <label>Description:</label>
          <input name="description" formControlName="description">
        </div>
      </fieldset>
      <div class="form-buttons">
        <button class="button button-primary"
                (click)="add()">Add</button>
      </div>
    </form>`,
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  form:FormGroup;
  constructor(private fb:FormBuilder,
              private dataService: DataService,
              private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['',Validators.required],
      description: ['',Validators.required]
    });
  }

  add(){
    const val = this.form.value;

    if (val.name && val.price && val.description) {
      this.dataService.addProduct(val.name, val.price, val.description)
        .subscribe(
          () => {
            alert(`${val.name} Added Successfully`);
            console.log("Product is Added");
            this.router.navigateByUrl('/add-product');
          }
        );
    }
  }

  ngOnInit() {
  }

}
