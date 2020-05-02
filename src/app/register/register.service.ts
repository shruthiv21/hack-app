import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpService: HttpClient) { }

  public submitRegistrationDetails(username, phone, address, email, password, pincode) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const options = { headers };
    return this.httpService.post('http://localhost:8080/telemedicine/user/addUserdetails', {
      username, phone, address, email, password, pincode}, options);
  }
}
