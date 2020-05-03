import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private baseUrl = '';

  constructor(private httpService: HttpClient) {
    this.baseUrl = 'http://localhost:8080/telemedicine/patientAppointment';

  }

  public uploadAttachment(phone, file) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data; boundary=----------287032381131322',
      'Access-Control-Allow-Origin': '*'
    });
    const options = { headers };
    return this.httpService.post(`${this.baseUrl}/uploadAttachment/${phone}`, { file }, options);
  }

  scheduleAppointment(phone, age, description, doctorsname, doctorsphoneno, attachmentUrl, appointmentdateandtime, currentdate, status) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const options = { headers };
    return this.httpService.post(`${this.baseUrl}/addPatientAppointment`, {
      phone, age, description, doctorsname, doctorsphoneno, attachmentUrl, appointmentdateandtime, currentdate, status
    }, options);
  }
}
