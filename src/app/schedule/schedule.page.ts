import { Component, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})

export class SchedulePage {

  @ViewChild('map', { static: false }) mapElement: ElementRef;

  public map: any;

  public latLng: any;

  public markers: any;

  public mapOptions: any;

  public isKM: any = 500;

  public isType: any = '';

  constructor(
    private ngZone: NgZone,
    private geolocation: Geolocation,
    public platform: Platform,
    public router: Router) {
      this.platform.ready().then(() => {
        this.loadMap();
      });
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
  }

  public cancel() {
    this.router.navigate(['/tabs/dashboard']);
  }
}
