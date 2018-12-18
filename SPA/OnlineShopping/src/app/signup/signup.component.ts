import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signup',
  template: `
<form [formGroup]="form">
    <fieldset>
        <legend>Register</legend>
        <div class="form-field">
            <label>Name:</label>
            <input name="name" formControlName="name">
        </div>
        <div class="form-field">
            <label>Email:</label>
            <input name="email" formControlName="email">
        </div>
        <div class="form-field">
            <label>Password:</label>
            <input name="password" formControlName="password" 
                   type="password">
        </div>
    </fieldset>
    <div class="form-buttons">
        <button class="button button-primary" 
                (click)="signup()">Sign Up</button>
    </div>
</form>`,
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form:FormGroup;

  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  signup() {
    const val = this.form.value;

    if (val.name && val.email && val.password) {
      this.authService.register(val.name, val.email, val.password)
        .subscribe(
          () => {
            console.log("User is Registered");
            this.router.navigateByUrl('/login');
          }
        );
    }
  }

  ngOnInit() {
  }

}
