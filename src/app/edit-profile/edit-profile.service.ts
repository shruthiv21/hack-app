import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  private baseUrl = '';

  constructor(private httpService: HttpClient) {
    this.baseUrl = 'http://localhost:8080/telemedicine/user/updateUserdetails/';
  }

  public editUserDetails(phone, username, address, email, password, pincode) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const options = { headers };
    return this.httpService.post(`${this.baseUrl}/${phone}`, {
      username, address, email, password, pincode }, options);
  }
}
