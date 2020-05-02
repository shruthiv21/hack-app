import { Component, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, LoadingController, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

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

  public placeList: any = [];

  public today = new Date();

  public imageURI: any;

  public imageFileName: any;

  constructor(
    private ngZone: NgZone,
    private geolocation: Geolocation,
    public platform: Platform,
    public router: Router,
    private sms: SMS,
    private transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
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
      this.router.navigate(['/tabs/dashboard']);
    }
  }

  public cancel() {
    this.router.navigate(['/tabs/dashboard']);
  }

  public async uploadFile() {
    const loader = await this.loadingCtrl.create({
      message: 'Uploading...'
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    const options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: 'image/jpeg',
      headers: {}
    };

    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      console.log(data + 'Uploaded Successfully');
      this.imageFileName = 'http://192.168.0.7:8080/static/images/ionicfile.jpg';
      loader.dismiss();
      this.presentToast('Image uploaded successfully');
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }

  public async presentToast(msg): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss();

    await toast.present();
  }
}
