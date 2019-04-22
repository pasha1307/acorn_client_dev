
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-records-content',
  templateUrl: './records-content.component.html',
  styleUrls: ['./records-content.component.scss']
})
export class RecordsContentComponent implements OnInit {
  @Input() r;
  @Output() ondelete = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onDelete(id) {
    this.ondelete.emit(id);
  }
}
