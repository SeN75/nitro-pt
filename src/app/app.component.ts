import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from './_services/language.service';
import { IdentityService } from 'src/app/_services/identity/identity.service';
import { TokenStorageService } from './_services/identity/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nitro-pt';
  constructor(
    private lang: LanguageService,
    private cookieSrv: CookieService,
    private identitySrv: IdentityService,
    private tokenSrv: TokenStorageService) {
    if (!cookieSrv.get('loggedin') && !this.tokenSrv.getRefreshToken())
      this.identitySrv.logout();
  }
}
