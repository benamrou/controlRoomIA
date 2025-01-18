import { Component, Input, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { UserDataService } from 'src/app/services';

@Component({
  selector: 'home-component',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})

export class HomePageComponent implements OnInit {

  @Input() menuEntry = 1;
  isSupported = false;
  barcodes: Barcode[] = [];


  constructor(private alertController: AlertController, public _userService: UserDataService) {
  }

  ngOnInit() {
    /*BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });*/

  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    try {
      const { barcodes } = await BarcodeScanner.scan();
      this.barcodes.push(...barcodes);
    } catch (error) {
      console.log('error : ', error);
      const alert = await this.alertController.create({
        header: 'Scan issue',
        message: 'Something went wrong during the scan process.',
        buttons: ['OK'],
      });
    }
   }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  switchMenu(e){
    this.menuEntry=e
  }
}