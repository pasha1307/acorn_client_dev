import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-proposal-submit',
  templateUrl: './proposal-submit.component.html',
  styleUrls: ['./proposal-submit.component.scss']
})
export class ProposalSubmitComponent implements OnInit {
  @Input() proposal;
  constructor() { }

  ngOnInit() {
  }

}
