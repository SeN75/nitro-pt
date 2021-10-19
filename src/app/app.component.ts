import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from './_services/language.service';
import { IdentityService } from 'src/app/_services/identity/identity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nitro-pt';
  constructor(private lang: LanguageService, private cookieSrv: CookieService, private identitySrv: IdentityService) {
    if (!cookieSrv.get('loggedin') && localStorage.getItem('refreshToken')) {
      cookieSrv.delete('loggedin')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('authToken')
    } else {
      this.identitySrv.getUserProfileByJWT()
    }
  }
}
