import { Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  public load: boolean;

  constructor(
    private platform: Platform,
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang('es');
    this.load = false;
    this.initApp();
  }

  initApp () {
    this.platform.ready().then(async () => {
      const lenguage = await Device.getLanguageCode();

      if (lenguage.value) {
        this.translate.use(lenguage.value.slice(0, 2));
      }
      this.load = true;
    });
  }
}
