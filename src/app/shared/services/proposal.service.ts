import { Injectable } from '@angular/core';
import {apiUrl} from '../api-url';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
proposalsUrl = apiUrl + 'proposals/';
proposalsEmailUrl = apiUrl + 'proposals-email/';
proposalsStatusUrl = apiUrl + 'proposals-status/';
respMsg;
  constructor(private http: HttpClient, private router: Router) { }
  getProposals() {
    return this.http.get<any[]>(this.proposalsUrl);
  }
  getProposal(id: string) {
    return this.http.get <any> (this.proposalsUrl  + id);
  }
  postProposal(proposal) {
    this.http
      .post(
        this.proposalsUrl,
        proposal
      )
      .subscribe(responseData => {
        console.log('POST Proposal', responseData);
        this.router.navigate(['/']);
      });
  }
  submitEmailProposal(proposal) {
    this.http
      .post(
        this.proposalsEmailUrl,
        proposal
      )
      .subscribe(responseData => {
        console.log('POST Proposal', responseData);
        this.router.navigate(['/']);
      });
  }
  approveEmailProposal(proposal) {
    this.http
      .post(
        this.proposalsStatusUrl,
        proposal
      )
      .subscribe(responseData => {
        console.log('POST Proposal', responseData);
        this.router.navigate(['/']);
      });
  }
  deleteProposal(proposalId) {
    this.http.delete(this.proposalsUrl + proposalId)
      .subscribe(response => {
        console.log('PROPOSAL DELETE RESPONSE', response);
        // this.respMsg = response;
        this.router.navigate(['/']);
      });
  }
  editProposal(proposalId, proposal) {
    this.http
      .put(this.proposalsUrl + proposalId, proposal)
      .subscribe(response => {
        console.log('UPDATED PROPOSAL RESPONSE', response);
        this.router.navigate(['/app/proposals']);
      });
  }
}
