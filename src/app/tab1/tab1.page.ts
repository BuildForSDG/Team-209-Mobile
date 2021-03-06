import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Plugins, Capacitor, CameraResultType } from '@capacitor/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({ selector: 'app-tab1', templateUrl: 'tab1.page.html', styleUrls: ['tab1.page.scss'] })
export class Tab1Page implements OnInit {
  constructor(private authService: AuthService, private alertController: AlertController) {}

  ngOnInit() {
    this.form = new FormGroup({ image: new FormControl(null) });
  }

  form: FormGroup;
  image: File;
  description: string;
  lat: number;
  lng: number;
  report = {
    user_id: '',
    location: {
      lat: this.lat,
      lng: this.lng
    },
    description: '',
    image_url: '',
    image: this.image,
    date: new Date()
  };
  submitting: boolean = false;

  pickImage() {
    const image = Plugins.Camera.getPhoto({ quality: 60, allowEditing: true, resultType: CameraResultType.Base64 })
      .then((image) => {
        var imageUrl = image.base64String;
        console.log('image-string', image);
        // Can be set to the src of an image now
        this.report.image_url = 'data:image/jpeg;base64,' + imageUrl;
        let imageFile;
        try {
          imageFile = this.base64toBlob(imageUrl.replace('data:image/jpeg;base64,', ''), 'image/jpeg');
          this.report.image = imageFile;
          this.form.patchValue({ image: imageFile });
          console.log('image', this.image);

          this.pickLocation();
        } catch (error) {
          console.log('Base64 conversion error:', error);
          return;
        }
      })
      .catch((error) => {
        console.log('camera error:', error);
      });

    console.log('imageFile', this.report);
  }

  async pickLocation() {
    const coordinates = await Plugins.Geolocation.getCurrentPosition();
    console.log('Current', coordinates);
    this.report.location.lat = coordinates.coords.latitude;
    this.report.location.lng = coordinates.coords.longitude;
    console.log(this.report);
  }

  base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = window.atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  submit() {
    this.submitting = true;
    console.log('submitting', this.report);
    let report_id = '';
    this.authService
      .create_report(this.report.description, this.report.location.lng, this.report.location.lat)
      .pipe(
        switchMap((res) => {
          console.log('report response', res);

          return this.authService.upload_attachment(this.form.get('image').value, res);
        })
      )
      .subscribe(
        (res) => {
          console.log('image response', res);
          this.submitting = false;

          this.alertController
            .create({
              header: 'New Report #' + this.authService.report_id,
              subHeader: '',
              message: 'Report sent successfully',
              buttons: ['OK']
            })
            .then((alert) => {
              alert.present();
            });

          this.report.image_url = '';
          this.report.description = '';
        },
        (error) => {
          console.log('image error', error);
          this.submitting = false;
          this.alertController
            .create({
              header: 'Error Alert',
              subHeader: '',
              message: error.message,
              buttons: ['OK']
            })
            .then((alert) => {
              alert.present();
            });
        }
      );
  }
}
