import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomePage implements OnInit {

  public username: string;

  public password: any;

  public warning = false;

  constructor(
    private router: Router,
    private homeService: HomeService) {}

  public ngOnInit() {
  }

  public onSubmit(form) {
    this.username = form.value.username;
    this.password = form.value.password;
    this.homeService.submitLoginDetails(this.username, this.password)
      .subscribe((res) => {
        if (res === true) {
          this.router.navigate(['/tabs/dashboard']);
        }
      }, () => {
        this.warning = true;
      });
  }

}
