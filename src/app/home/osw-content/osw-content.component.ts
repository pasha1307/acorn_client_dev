import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-osw-content',
  templateUrl: './osw-content.component.html',
  styleUrls: ['./osw-content.component.scss']
})
export class OswContentComponent implements OnInit {
@Input() r;
@Output() ondelete = new EventEmitter();
  constructor() { }

  ngOnInit() {}
  onDelete(id) {
    this.ondelete.emit(id);
  }
}
