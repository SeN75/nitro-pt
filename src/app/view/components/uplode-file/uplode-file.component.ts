import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { LoggerService } from 'src/app/_services/logger.service';

@Component({
  selector: 'uplode-file',
  templateUrl: './uplode-file.component.html',
  styleUrls: ['./uplode-file.component.scss']
})
export class UplodeFileComponent implements OnInit {
  fileControl = new FormControl('', Validators.required)
  constructor(private http: HttpClient, private logger: LoggerService) { }

  ngOnInit(): void {
  }

  isUploading = false;
  fileName = '';
  index = -1;
  progress = 0;
  src: any = '';
  @ViewChild("fileDropRef", { static: false }) fileDropEl!: ElementRef;
  @Input() photos: any[] = [];
  @Output() newPhoto: any = new EventEmitter();
  @Output() file: any = new EventEmitter();
  @HostBinding('class.fileover') fileOver!: boolean;
  @Output() fileDropped = new EventEmitter<any>();
  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    console.log('dfdf')

  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileBrowseHandler(files)
    }
  }
  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any) {
    this.prepareFilesList(files.target.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.photos[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.photos.splice(index, 1);
    this.newPhoto([...this.photos])
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    this.isUploading = true;
    setTimeout(() => {
      if (index === this.photos.length) {
        this.getCarPic(this.photos);
        this.isUploading = false;

        return;
      } else {
        const progressInterval = setInterval(() => {
          this.fileName = this.photos[index].name;
          this.index = index;
          if (this.photos[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.photos[index].progress += 5;
            this.progress = this.photos[index].progress;
          }
        }, 100);
      }
    }, 500);
  }
  // previewImg(pic: any) {
  //   this.dialogSrv.picPreview(pic)
  // }
  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.photos.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  getCarPic(files: File[]) {
    if (files.length != 0) {




      this.logger.log('length :', files.length)
      files.forEach(e => {
        this.logger.log('file:', e)
        let reader = new FileReader();
        reader.readAsDataURL(e);
        reader.onload = () => {
          this.logger.log('file retult: ', reader.result)
          this.src = reader.result;
          this.logger.log('new photo: ', this.src)
          this.newPhoto.emit(this.src);
          this.file.emit(this.photos[this.photos.length - 1])

        }
      })

      this.logger.log('new photo: ', this.src)
    }
  }
}
