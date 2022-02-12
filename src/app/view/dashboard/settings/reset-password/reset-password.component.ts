import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmPasswordValidator } from 'src/app/_helpers/confirm-password.validator';
import { IdentityService } from 'src/app/_services/identity/identity.service';
import { LoggerService } from 'src/app/_services/logger.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup | any;
  hidePassword = false;
  constructor(
    private formBuilder: FormBuilder,
    private logger: LoggerService,
    private identitySrv: IdentityService,
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      new_password: ['', [Validators.required]],
      re_new_password: ['', [Validators.required]],
      current_password: ['', [Validators.required]],
    }, {
      validator: ConfirmPasswordValidator("new_password", "re_new_password")

    })

  }

  ngOnInit(): void {
  }
  onNoClick() {
    this.dialogRef.close();
  }
  action() {
    this.identitySrv.changeCurrentUserPassword(this.resetPasswordForm.value, this.resetPasswordForm).then(s => this.onNoClick());
  }
}
