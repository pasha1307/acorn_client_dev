import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-proposal-content',
  templateUrl: './proposal-content.component.html',
  styleUrls: ['./proposal-content.component.scss']
})
export class ProposalContentComponent implements OnInit {
@Input() proposal;
  constructor() { }

  ngOnInit() {
  }

}
