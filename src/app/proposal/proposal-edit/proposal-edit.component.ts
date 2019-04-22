import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ProposalService} from '../../shared/services/proposal.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-proposal-edit',
  templateUrl: './proposal-edit.component.html',
  styleUrls: ['./proposal-edit.component.scss']
})
export class ProposalEditComponent implements OnInit {
  proposalId;
  proposal;
  coordinators;
  curators;
  locations;
  proposedByArr = [];
  order = 'sortName';
  editForm: FormGroup;
  constructor(private route: ActivatedRoute, public propService: ProposalService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      minimumProposedHours: [''],
      maximumProposedHours: [''],
      proposalDate: [''],
      proposedBy: [''],
      examDate: [''],
      examLocationId: [''],
      dimensionUnit: [''],
      height: [''],
      width: [''],
      thickness: [''],
      description: [''],
      condition: [''],
      treatment: ['']
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('proposalId')) {
        this.proposalId = paramMap.get('proposalId');
        this.propService.getProposal(this.proposalId)
          .subscribe(result => {
            this.proposal = result;
            this.proposedByArr = this.proposal.PropBy;
            this.initForm();
          });
      }
    });
    this.coordinators = this.route.snapshot.data.roles.filter(role => role.accessLevel === 'Regular');
    this.curators = this.route.snapshot.data.roles.filter(role => role.accessLevel === 'Curator');
    this.locations = this.route.snapshot.data.utils.filter(el => el.Locations);
  }
  initForm() {
    if (this.proposal) {
      this.editForm = this.fb.group({
        minimumProposedHours: [this.proposal.maximumProposedHours],
        maximumProposedHours: [this.proposal.minimumProposedHours],
        proposalDate: [this.proposal.proposalDate],
        proposedBy: [''],
        examDate: [this.proposal.examDate],
        examLocationId: [this.proposal.examLocationId],
        dimensionUnit: [this.proposal.dimensionUnit],
        height: [this.proposal.height],
        width: [this.proposal.width],
        thickness: [this.proposal.thickness],
        description: [this.proposal.description],
        condition: [this.proposal.condition],
        treatment: [this.proposal.treatment]
      });
    }
  }
  onRemove(person) {
  const newArr = this.proposedByArr.filter(el => el.personId !== person.personId);
  this.proposedByArr = newArr;
  return this.proposedByArr;
}
onSave() {
  const currentIds = this.proposedByArr.map(el => el.personId);
  const concatArr = [...currentIds, ...this.editForm.value.proposedBy];
  const proposedByUpdate = Array.from(new Set(concatArr));
  const proposal = {
    proposalId: this.proposalId,
    data: this.editForm.value,
    proposedBy: proposedByUpdate
  }
  this.propService.editProposal(this.proposalId, proposal);
}
}
