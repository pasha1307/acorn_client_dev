import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UtilService} from '../shared/services/util.service';
import {Observable} from 'rxjs';
import {FilesService} from '../shared/services/files.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  order: {displayName: ''};
  form: FormGroup;
  fileDataUrl = 'http://localhost:5001/api/files';
  link = '';
  singleImg = {};
  images: any[] = [];
  delUrl = 'http://localhost:5001/uploads/';
  delFileName = '';
  @Input() coordinatorId;
  @Input() identificationId;
  coordinators$: Observable<any>;
  newText = 'Upload';
  constructor(
    public utilService: UtilService,
    public filesService: FilesService,
    public http: HttpClient) { }

  ngOnInit() {
    this.coordinators$ = this.utilService.getCoordinators();
  }
  onFileComplete(data: any) {
    // this.show = false;
    this.newText = 'Add Another File';
    this.singleImg = {
      name: data.file.name,
      path: 'http://localhost:5001/' + data.file.path.substring(7),
      size: data.file.size,
      mtime: data.file.mtime,
      mb: Math.ceil(data.file.size / 100000),
    }
    this.delFileName = data.file.path.substring(7);
    this.link = 'http://localhost:5001/' + data.file.path.substring(7);
    this.images.push(this.singleImg);
    // console.log(data);
  }
  onDel(f) {
    this.http.delete(this.delUrl + this.delFileName).subscribe(res => {
      const index = this.images.indexOf(f);
      this.images.splice(index, 1);
      return this.images;
    });
  }
  onSubmit(form: NgForm) {
    const file = {
      identificationId: this.identificationId,
      data: form.value,
      images: this.images
    };
    console.log(file);
    this.filesService.saveFileData(file);
  }

}
