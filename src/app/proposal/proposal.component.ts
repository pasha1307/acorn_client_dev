import {Component, Input, OnInit} from '@angular/core';
import {ProposalService} from '../shared/services/proposal.service';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnInit {
  proposalId;
  coordinators = [];
  curators = [];
  proposals: any[] = [];
  notsubmitted: any[] = [];
  submitted: any[] = [];
  approved: any[] = [];
  other: any[] = [];
  proposal = {};
  activityType;
  showSubmit = true;
  constructor(public propService: ProposalService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.curators = this.route.snapshot.data.roles.filter(role => role.accessLevel === 'Curator');
    this.coordinators = this.route.snapshot.data.roles.filter(role => role.accessLevel === 'Regular');
    this.proposals = this.route.snapshot.data.proposals;
    this.proposals.map((el, i) => {
      const propArr = el.proposalApprovalHistories.reverse();
      const isReport = propArr.filter(x => x.activityType.includes('Report'));
      const isComment = propArr.filter(x => x.activityType.includes('Comment'));
      const isApproved = propArr.filter(x => x.activityType.includes('Approved'));
      if (!propArr.length) {
       this.notsubmitted.push(el);
      }
      if (propArr.length > 0 && isApproved.length > 0) {
        this.approved.push(el);
      }
      if (propArr.length === 1 && propArr[0].activityType.includes('Proposal')) {
        this.submitted.push(el);
      }
      if (propArr.length > 0 && isReport.length && isComment.length) {
        this.other.push(el);
      }
    });

  }
  onDelete(id) {
    this.propService.deleteProposal(id);
  }
}


