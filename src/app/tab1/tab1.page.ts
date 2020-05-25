import { Component } from '@angular/core';
import { Plugins, Capacitor, CameraResultType } from '@capacitor/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor() {}

  image: File;
  report = {
    user_id: '',
    location: {
      lat: '',
      lng: ''
    },
    description: '',
    image_url: '',
    image: this.image
  };

  async pickImage() {
    const image = await Plugins.Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    var imageUrl = image.webPath;
    console.log(imageUrl);
    // Can be set to the src of an image now
    this.report.image_url = imageUrl;
  }
}
