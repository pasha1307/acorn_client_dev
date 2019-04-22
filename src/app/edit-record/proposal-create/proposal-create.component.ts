import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import {ProposalService} from '../../shared/services/proposal.service';

@Component({
  selector: 'app-proposal-create',
  templateUrl: './proposal-create.component.html',
  styleUrls: ['./proposal-create.component.scss']
})
export class ProposalCreateComponent implements OnInit {
  @Input() record: any = {};
  propForm: FormGroup;
  identificationId = new FormControl();
  proposedBy = new FormControl();
  emailFrom = new FormControl('');
  emailTo = new FormControl();
  emailCC = new FormControl();
  emailSubject = new FormControl('Request For Approval');
  order = 'sortName';
  coordinators;
  curators;
  locations;
  showEmail = false;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private propService: ProposalService) {
    this.propForm = this.fb.group({
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
  ngOnInit(): void {
    this.coordinators = this.route.snapshot.data.roles.filter(role => role.accessLevel === 'Regular');
    this.curators = this.route.snapshot.data.roles.filter(role => role.accessLevel === 'Curator');
    this.locations = this.route.snapshot.data.utils.filter(el => el.Locations);
  }
  onSave() {
    const proposal = {
      identificationId: this.record.identificationId,
      data: this.propForm.value
    };
    this.propService.postProposal(proposal);
  }
}
