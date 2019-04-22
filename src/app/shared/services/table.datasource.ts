import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Record} from '../../models/record.model';
import {RecordsService} from './records.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class RecordsDataSource implements DataSource<Record> {

  private recordSubject = new BehaviorSubject<Record[]>([]);
  constructor(private recordService: RecordsService) {
  }
  loadRecords() {
    this.recordService.allRecords()
      .subscribe(records => this.recordSubject.next(records));

  }

  connect(collectionViewer: CollectionViewer): Observable<Record[]> {
    return this.recordSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.recordSubject.complete();
  }

}
