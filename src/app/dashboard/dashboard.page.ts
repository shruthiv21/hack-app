import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CovidTrackerApiService } from '../covid-tracker-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public username: any;

  public sub: any;

  public result: any;

  public stateNames: any = [];

  public districtData: any;

  public confirmed: any;

  public confirmedNumber;

  public confirmedCasesList: any = [];

  public recovered: any;

  public recoveredNumber;

  public recoveredCasesList: any = [];

  public deceased: any;

  public deceasedNumber;

  public deceasedCasesList: any = [];

  public dataSet1: any;

  public dataSet2: any;

  public newDataSet1: any = [];

  public newDataSet2: any = [];

  public newData: any = [];

  public data: any;

  public today = new Date();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private covidTrackerApiService: CovidTrackerApiService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.username = params.username;
    });
    this.covidTrackerApiService.getDistrictWiseDetails().subscribe((result) => {
      this.result = result;
      Object.values(this.result).forEach((d: any) => {
        this.confirmedNumber = 0;
        this.recoveredNumber = 0;
        this.deceasedNumber = 0;
        this.stateNames.push(d.statecode);
        Object.values(d.districtData).forEach((dn: any) => {
          this.confirmedNumber += dn.confirmed;

          this.recoveredNumber += dn.recovered;

          this.deceasedNumber += dn.deceased;
        });
        this.confirmedCasesList.push(this.confirmedNumber);
        this.recoveredCasesList.push(this.recoveredNumber);
        this.deceasedCasesList.push(this.deceasedNumber);
      });
      this.stateNames.forEach((s, i) => {
        this.dataSet1 = {};
        this.dataSet1.state = s;
        this.dataSet1.confirmedCases = this.confirmedCasesList[i];
        this.newDataSet1.push(this.dataSet1);
      });
      this.recoveredCasesList.forEach((r, i) => {
        this.dataSet2 = {};
        this.dataSet2.recoveredCases = r;
        this.dataSet2.deceasedCases = this.deceasedCasesList[i];
        this.newDataSet2.push(this.dataSet2);
      });
      this.newDataSet1.forEach((nd, ni) => {
        this.data = {};
        this.data.state = nd.state;
        this.data.confirmedCases = nd.confirmedCases;
        this.data.recoveredCases = this.newDataSet2[ni].recoveredCases;
        this.data.deceasedCases = this.newDataSet2[ni].deceasedCases;
        this.newData.push(this.data);
      });
      console.log(this.newData);
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

  public help() {
    this.router.navigate(['/help']);
  }

  public settings() {
    this.router.navigate(['/settings']);
  }

  public signOut() {
    this.router.navigate(['/home']);
  }

}
