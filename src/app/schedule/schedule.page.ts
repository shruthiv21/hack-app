import { Component, NgZone, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Platform, LoadingController, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SMS } from '@ionic-native/sms/ngx';

import { ScheduleService } from './schedule.service';

declare var google;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})

export class SchedulePage implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;

  public map: any;

  public latLng: any;

  public markers: any;

  public mapOptions: any;

  public isKM: any = 500;

  public isType: any = '';

  public placeList: any = [];

  public today = new Date();

  public phone: any;

  public age: any;

  public description: string;

  public doctorsname: string;

  public doctorsphoneno = '9686663880';

  public attachmentUrl: string;

  public appointmentdateandtime: string;

  public imageURI = '../../assets/images/x-ray-image-1.jpg';

  public imageFileName: any;

  public currentdate: any;

  public status: any;

  constructor(
    private ngZone: NgZone,
    private geolocation: Geolocation,
    public platform: Platform,
    public router: Router,
    private sms: SMS,
    private datePipe: DatePipe,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private httpService: HttpClient,
    private scheduleService: ScheduleService) {
      this.platform.ready().then(() => {
        this.loadMap();
      });
    }

  public ngOnInit() {
    this.phone = localStorage.getItem('phone');
  }

  public loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.mapOptions = {
        center: this.latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
    }, (err) => {
      console.log('err ' + err);
    });
  }

  public nearbyPlace() {
    this.loadMap();
    this.markers = [];
    const service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch({
              location: this.latLng,
              radius: this.isKM,
              types: [this.isType]
            }, (results, status) => {
                this.callback(results, status);
            });
  }

  public callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      }
    }
  }

  public createMarker(place) {
    const placeLoc = place;
    this.placeList.push(placeLoc);
    console.log(this.placeList);
    console.log('placeLoc', placeLoc);
    this.markers = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location
    });
    const infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(this.markers, 'click', () => {
      this.ngZone.run(() => {
        infowindow.setContent(place.name);
        infowindow.open(this.map, this.markers);
      });
    });
  }

  public onSubmit(form) {
    console.log(form);
    if (this.platform.is('cordova')) {
      // this.age = form.value.age;
      // this.description = form.value.description;
      // this.doctorsname = form.value.doctor;
      // this.attachmentUrl = 'https://s3.us-east-2.amazonaws.com/myawsbucketprag';
      // this.appointmentdateandtime = form.value.appointment;
      // this.currentdate = this.datePipe.transform(this.today, 'dd-MM-yyyy');
      // console.log(this.currentdate);
      // this.scheduleService
      // .scheduleAppointment(this.phone, this.age, this.description, this.doctorsname, this.doctorsphoneno, this.attachmentUrl, this.appointmentdateandtime, this.currentdate, this.status)
      //   .subscribe();
      // this.router.navigate(['/tabs/dashboard']);

      const options = {
        replaceLineBreaks: true,
        android: {
          intent: 'INTENT'
        }
      };
      this.sms.send('9916874417', 'Hello world!', options).then(() => {
        console.log('Working');
        alert('SMS sent');
      }, (err) => {
        console.log(err);
      });
    } else {
      console.log('Not working');
      this.age = form.value.age;
      this.description = form.value.description;
      this.doctorsname = form.value.doctor;
      this.attachmentUrl = 'https://s3.us-east-2.amazonaws.com/myawsbucketprag/attachment/9916874417/x-ray-image-1.jpg';
      this.appointmentdateandtime = form.value.appointment;
      this.currentdate = this.datePipe.transform(this.today, 'dd-MM-yyyy');
      console.log(this.currentdate);
      this.scheduleService
      .scheduleAppointment(this.phone, this.age, this.description, this.doctorsname, this.doctorsphoneno, this.attachmentUrl, this.appointmentdateandtime, this.currentdate, this.status)
        .subscribe();
      this.router.navigate(['/tabs/dashboard']);
    }
  }

  public updateFile(files: any[]) {
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.httpService
      .post(`http://localhost:8080/telemedicine/patientAppointment/uploadAttachment/${this.phone}`, formData).subscribe();
     }
  }

  public attachFile(phone, file) {
    console.log(file);
    this.scheduleService.uploadAttachment(phone, file).subscribe();
  }

  public cancel() {
    this.router.navigate(['/tabs/dashboard']);
  }
}
