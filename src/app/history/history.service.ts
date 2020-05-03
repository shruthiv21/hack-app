import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private baseUrl = '';
  private statusUrl = '';

  constructor(
    private httpService: HttpClient) {
      this.baseUrl = 'http://localhost:8080/telemedicine/patientAppointment/findAllappointmenthistory';
      this.statusUrl = 'http://localhost:8080/telemedicine/patientAppointment/updateAppointmentStatus';
    }

  public getAppointmentHistory(phone: string) {
    return this.httpService.get(`${this.baseUrl}/${phone}`);
  }

  public updateAppointmentStatus(appointmentTime, appointmentDate, phone, status) {
    return this.httpService.patch(`${this.statusUrl}/${phone}?dateAndTime=` +
    `${appointmentTime}` + ` ` + `${appointmentDate}&status=${status}`, {});
  }

}
