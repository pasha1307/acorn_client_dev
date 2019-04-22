import {Observable} from 'rxjs';
import {delayWhen, filter, map, retryWhen, shareReplay, tap, withLatestFrom} from 'rxjs/operators';


// const http$ = createHttpObservable('http://localhost:5001/records');
// function createHttpObservable(url: string) {
//   return Observable.create(observer => {
//     fetch(url)
//       .then(response => {
//
//         if (response.ok) {
//           return response.json();
//         } else {
//           observer.error('Request failed with status code: ' + response.status);
//         }
//       })
//       .then(body => {
//         observer.next(body);
//         observer.complete();
//       })
//       .catch(err => {
//         observer.error(err);
//       });
//   });
// }
export const result = Observable.create(observer => {
  fetch('http://localhost:5001/records')
    .then(response => {

      if (response.ok) {
        return response.json();
      } else {
        observer.error('Request failed with status code: ' + response.status);
      }
    })
    .then(body => {
      observer.next(body);
      observer.complete();
    })
    .catch(err => {
      observer.error(err);
    });
});
