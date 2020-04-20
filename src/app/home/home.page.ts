import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public username: string;

  constructor(private router: Router) {}

  public ngOnInit() {
  }

  // public onSubmit(form) {
  //   this.username = form.value.username;
  //   this.router.navigate(['dashboard', this.username]);
  // }

  public onSubmit(form) {
    this.username = form.value.username;
    // this.router.navigate(['tabs', this.username]);
    this.router.navigate(['/tabs']);
  }

}
