import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {SettingsService} from './services/settings.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

export function loadConfig(app: SettingsService) {
  return () => {
    return new Promise((resolve, reject) => {
      app.load();
      setTimeout(() => {
        if (app.isStatusLoad()) {
          resolve();
        }
      }, 500);
    });
  }
}


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [SettingsService],
      multi: true
    },
  ],
})
export class OuterConfigModule { }
