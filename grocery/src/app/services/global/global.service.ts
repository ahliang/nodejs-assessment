import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private translateService: TranslateService) { }

  public errorAlert(response) {
    try {
      console.log("An error has occurred: ", response);
      if (response.errorCode) {
        window.alert(this.translateService.instant(`app.grocery.errorCodes.${response.errorCode}`));
      }
      else {
        window.alert(this.translateService.instant(`app.grocery.errorCodes.01001`));
      }
    }
    catch (ex) {
      console.log(ex);
    }
  }
}
