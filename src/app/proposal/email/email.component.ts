import {Component, Input, OnInit} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ProposalService} from '../../shared/services/proposal.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  @Input() p;
  @Input() tosubmit;
  activityType;
  coordinators;
  curators;
  constructor(private route: ActivatedRoute, public propService: ProposalService) { }

  ngOnInit() {
    this.coordinators = this.route.snapshot.data.roles.filter(role => role.accessLevel === 'Regular');
    this.curators = this.route.snapshot.data.roles.filter(role => role.accessLevel === 'Curator');
  }
  getCallNumbers(p) {
    if (!p.itemIdentification.callNumbers.length) {
      return null;
    }
    return p.itemIdentification.callNumbers.map(el => el.callNumber);
  }
  getPropBy(p) {
    if (!p.itemIdentification.callNumbers.length) {
      return null;
    }
    return p.PropBy.map(el => el.displayName);
  }
  onSubmit(form: NgForm, p) {
    const callNums = this.getCallNumbers(p);
    const proposedBy = this.getPropBy(p);
    this.activityType = 'Proposal Submitted';
    const application = {
      pkid: p.proposalId,
      activityType: this.activityType,
      details: p.description || '',
      authorId: p.itemIdentification.item.coordinatorId,
      to: form.value.emailTo,
      from: form.value.emailFrom,
      cc: form.value.emailCC,
      subject: form.value.emailSubject,
      comments: form.value.emailComment,
      treatment: p.treatment,
      condition: p.condition,
      size: `h=${p.height},w=${p.width},th=${p.thickness}`,
      repo: p.location.Location || null,
      curator: p.itemIdentification.ItemCurator.DisplayName || '',
      authorArtist: p.itemIdentification.item.authorArtist || '',
      title: p.itemIdentification.Title || '',
      doo: p.itemIdentification.item.dateOfObject || '',
      hours: `${p.maximumProposedHours} -${p.minimumProposedHours}` || '',
      callNums,
      proposedBy
    };
    console.log('TO EMIAL', application);
    this.propService.submitEmailProposal(application);
  }
  onApprove(form: NgForm, p) {
    this.activityType = 'Approved';
    const feedback = {
      pkid: p.proposalId,
      activityType: this.activityType,
      authorId: p.itemIdentification.ItemCuratorPlus.PersonID,
      to: form.value.emailTo,
      from: form.value.emailFrom,
      cc: form.value.emailCC,
      subject: form.value.emailSubject,
      comments: form.value.emailComment,
      curator: p.itemIdentification.ItemCurator.DisplayName || ''
    };
    console.log('onApprove', feedback);
    this.propService.approveEmailProposal(feedback);
  }
  onDeny(form: NgForm, p) {
    this.activityType = 'Denied';
    const feedback = {
      pkid: p.proposalId,
      activityType: this.activityType,
      authorId: p.itemIdentification.ItemCuratorPlus.PersonID,
      to: form.value.emailTo,
      from: form.value.emailFrom,
      cc: form.value.emailCC,
      subject: form.value.emailSubject,
      comments: form.value.emailComment,
      curator: p.itemIdentification.ItemCurator.DisplayName || ''
    };
    console.log('onDeny', feedback);
    this.propService.approveEmailProposal(feedback);
  }
}



