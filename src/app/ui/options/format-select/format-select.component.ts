import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {UtilService} from '../../../shared/services/util.service';

@Component({
  selector: 'app-format-select',
  templateUrl: './format-select.component.html',
  styleUrls: ['./format-select.component.scss']
})
export class FormatSelectComponent implements OnInit {
// formats$: Observable<any>;
  constructor() { }

  ngOnInit() {
    // this.formats$ = this.formatService.getActiveFormats();
  }

}
