import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EditProfileService } from './edit-profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  public today = new Date();

  public username: string;

  public address: string;

  public email: string;

  public password: any;

  public pincode: string;

  public phone: string;

  constructor(
    private router: Router,
    private editProfileService: EditProfileService) { }

  ngOnInit() {
    this.phone = localStorage.getItem('phone');
  }

  public onSubmit(form) {
    this.username = form.value.username;
    this.address = form.value.address;
    this.email = form.value.email;
    this.password = form.value.password;
    this.pincode = form.value.pincode;

    this.editProfileService
      .editUserDetails(this.phone, this.username, this.address, this.email, this.password, this.pincode)
        .subscribe((res) => {
          console.log(res);
          this.router.navigate(['/tabs/dashboard']);
        });
  }

  public cancel() {
    this.router.navigate(['/tabs/dashboard']);
  }
}
