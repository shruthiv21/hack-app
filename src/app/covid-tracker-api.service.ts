import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidTrackerApiService {

  constructor(private httpService: HttpClient) { }

  public getDistrictWiseDetails() {
    return this.httpService.get('https://api.covid19india.org/state_district_wise.json');
  }
}
