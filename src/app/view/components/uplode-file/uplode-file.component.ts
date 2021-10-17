import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'uplode-file',
  templateUrl: './uplode-file.component.html',
  styleUrls: ['./uplode-file.component.scss']
})
export class UplodeFileComponent implements OnInit {
  fileControl = new FormControl('', Validators.required)
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  fileBrowserHandler(event: any) { }

  public upload(_files: Set<File>): { [key: string]: { progress: Observable<number> } } {

    const status: { [key: string]: { progress: Observable<number> } } = {};
    _files.forEach(file => {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      const req = new HttpRequest('POST', window.location.href, formData, {
        reportProgress: true
      });


      const progress = new Subject<number>();


      this.http.request(req).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {


          const percentDone = Math.round(100 * event.loaded / event.total);


          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {

          progress.complete();
        }
      });
      status[file.name] = {
        progress: progress.asObservable()
      };
    });
    return status;
  }
}
