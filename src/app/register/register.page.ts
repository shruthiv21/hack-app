import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public username: string;

  public phone: string;

  public address: string;

  public email: string;

  public password: any;

  public pincode: string;

  public today = new Date();

  public sub: any;

  constructor(
    private router: Router,
    private registerService: RegisterService) { }

  ngOnInit() {
  }

  public onSubmit(form) {
    console.log(form);
    this.username = form.value.username;
    this.phone = form.value.phone;
    this.address = form.value.address;
    this.email = form.value.email;
    this.password = form.value.password;
    this.pincode = form.value.pincode;

    localStorage.setItem('phone', this.phone);

    this.registerService
     .submitRegistrationDetails(this.username, this.phone, this.address, this.email, this.password, this.pincode)
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/tabs/dashboard']);
      });
  }

  public cancel() {
    this.router.navigate(['/home']);
  }
}
