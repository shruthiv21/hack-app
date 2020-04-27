import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  public today = new Date();

  constructor(
    private router: Router) { }

  ngOnInit() {
  }

  public cancel() {
    this.router.navigate(['/tabs/dashboard']);
  }
}
