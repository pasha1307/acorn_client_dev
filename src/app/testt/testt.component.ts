import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-testt',
  templateUrl: './testt.component.html',
  styleUrls: ['./testt.component.scss']
})
export class TesttComponent implements OnInit {
  @Input() record: any = {};
  propForm: FormGroup;
  identificationId = new FormControl();
  proposedBy = new FormControl();
  proposedByIds: any[] = [];
  order = 'sortName';
  coordinators;
  locations;
  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
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
    this.locations = this.route.snapshot.data.utils.filter(el => el.Locations);
  }
onSave() {
    const idid = this.record.identificationId;
    console.log(this.propForm.value, 'ID', idid);
}
}
// proposalId:
// identificationId:
// proposalDate+
// description+
// condition+
// treatment+
// minimumProposedHours+
// maximumProposedHours+
// height+
// width+
// thickness+
// dimensionUnit: 'cm','in'+
// examDate+
// examLocationId+
// ApprovedPart
//   historyId:
// pkid:
// recordType:
// activityType:
// details:
// authorId:
// dateEntered:
// ProposedBy
// personId:
// proposalId
