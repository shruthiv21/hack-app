import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';

import { HistoryService } from './history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  public today = new Date();

  public users = [];

  public phone: any;

  public appointmentDetails = [];

  public appointmentDataAndTime: any;

  public doctorName: string;

  public doctorPhoneNo: string;

  public description: string;

  public status: string;

  public attachments: string;

  constructor(
    private historyService: HistoryService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.phone = localStorage.getItem('phone');
    console.log(this.phone);

    this.historyService.getAppointmentHistory(this.phone)
      .subscribe((res) => {
        Object.values(res).forEach((r) => {
          this.appointmentDetails.push(r);
          const appointmentTime = r.appointmentdateandtime.split(' ')[0];
          const appointmentDate = r.appointmentdateandtime.split(' ')[1];

          const transformedDate = this.datePipe.transform(this.today, 'dd-MM-yyyy');

          const todayDate = transformedDate.split('-')[0];
          const thisMonth = transformedDate.split('-')[1];
          const thisYear = transformedDate.split('-')[2];

          const appointmentDay = appointmentDate.split('-')[0];
          const appointmentMonth = appointmentDate.split('-')[1];
          const appointmentYear = appointmentDate.split('-')[2];

          if (todayDate > appointmentDay) {
            if (thisMonth > appointmentMonth) {
              if (thisYear >= appointmentYear) {
                r.status = 'completed';
              }
            }
          } else if (todayDate > appointmentDay) {
            if (thisMonth < appointmentMonth) {
              if (thisYear >= appointmentYear) {
                r.status = 'completed';
              }
            }
          } else if (todayDate > appointmentDay) {
            if (thisMonth > appointmentMonth) {
              if (thisYear < appointmentYear) {
                r.status = 'completed';
              }
            }
          } else if (todayDate < appointmentDay) {
            if (thisMonth > appointmentMonth) {
              if (thisYear >= appointmentYear) {
                r.status = 'completed';
              }
            }
          } else if (todayDate < appointmentDay) {
            if (thisMonth < appointmentMonth) {
              if (thisYear === appointmentYear) {
                r.status = 'pending';
              }
            }
          } else if (todayDate < appointmentDay) {
            if (thisMonth < appointmentMonth) {
              if (thisYear < appointmentYear) {
                r.status = 'pending';
              }
            }
          } else {
            r.status = 'Date not correct';
          }

          this.historyService
            .updateAppointmentStatus(appointmentTime, appointmentDate, this.phone, r.status).subscribe();

        });
      });
  }

}
