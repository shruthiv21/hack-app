import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public username: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // public onSubmit(form) {
  //   this.username = form.value.username;
  //   this.router.navigate(['dashboard', this.username]);
  // }

  public onSubmit(form) {
    this.username = form.value.username;
    // this.router.navigate(['tabs', this.username]);
    // this.router.navigate(['/tabs/dashboard']);
  }

  public cancel() {
    this.router.navigate(['/home']);
  }
}
