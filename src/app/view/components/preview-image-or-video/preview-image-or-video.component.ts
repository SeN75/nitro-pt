import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoggerService } from 'src/app/_services/logger.service';

@Component({
  selector: 'app-preview-image-or-video',
  templateUrl: './preview-image-or-video.component.html',
  styleUrls: ['./preview-image-or-video.component.scss']
})
export class PreviewImageOrVideoComponent implements OnInit {
  src = '';
  constructor(
    public dialogRef: MatDialogRef<PreviewImageOrVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private logger: LoggerService,
  ) { }

  ngOnInit(): void {
    this.logger.log('data: ', this.data)
    this.logger.log('data.value: ', this.data.value)
    this.src = this.data.src;
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
