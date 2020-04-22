import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public username: any;

  public sub: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.username = params.username;
    });
  }

  public back() {
    this.router.navigate(['/home']);
  }

  public editProfile() {
    console.log('Edit profile');
    this.router.navigate(['/edit-profile']);
  }

  public feedback() {
    this.router.navigate(['/feedback']);
  }

  public signOut() {
    this.router.navigate(['/home']);
  }

}
