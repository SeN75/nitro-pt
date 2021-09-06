import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toaterAlert: MatSnackBar, private lang: LanguageService) { }
  success(message: string) {
    this.toaterAlert.open(message, '', {
      direction: this.lang.dir,
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'success-message'
    })
  }
  error(message: string) {
    this.toaterAlert.open(message, '', {
      direction: this.lang.dir,
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'error-message'
    })
  }
}
