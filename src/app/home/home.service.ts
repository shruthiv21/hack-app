import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpService: HttpClient) { }

  public submitLoginDetails(username, password) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const options = { headers };
    return this.httpService.post('http://localhost:8080/telemedicine/user/findUser',
    { username, password }, options);
  }
}
