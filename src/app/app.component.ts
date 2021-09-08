import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from './_services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nitro-pt';
  constructor(private lang: LanguageService, private cookieSrv: CookieService) {
    if (!cookieSrv.get('loggedin') && localStorage.getItem('refreshToken')) {
      cookieSrv.delete('loggedin')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('authToken')
    }
  }
}
