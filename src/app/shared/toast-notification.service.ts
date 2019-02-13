import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ToastNotificationService {

  constructor(private translate: TranslateService) { }

  success(messageCode: string, params?: Object) {
    this.translate.get(messageCode, params)
      .subscribe(translation => {
        // TODO handle this
      });
  }

  error(messageCode: string, params?: Object) {
    this.translate.get(messageCode, params)
      .subscribe(translation => {
        // TODO handle this
      });
  }
}
