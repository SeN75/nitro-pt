import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LanguageService } from './language.service';
import { DialogService } from 'src/app/_services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toaterAlert: MatSnackBar,
    private lang: LanguageService,
    private dialog: DialogService) { }
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

  errors(messages: any) {
    let data: any = [];
    let keySet: any[] = Object.keys(messages)

    if (keySet.length == 1)
      this.error(messages[keySet[0]])
    else if (keySet.length > 1) {
      keySet.forEach(e => data.push(e))
      this.dialog.anErrorOccurred(data)
    }
  }
}
