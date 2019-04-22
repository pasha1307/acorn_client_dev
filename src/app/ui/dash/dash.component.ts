import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'ENTRY Page', formName: 'Record Title', txt: 'List of User Records, Operations Available, User Info', cols: 1, rows: 1 },
          { title: 'Record Create Block', formName: 'Collection Name', txt: 'full screen Form Component', cols: 1, rows: 1 },
          { title: 'OSW Create Block', formName: 'Artist/Author', txt: 'full screen OSW Form Component', cols: 1, rows: 1 },
          { title: 'Edit Block', txt: 'Routing strateg ptions', formName: 'Date of Return', cols: 1, rows: 1 },
          { title: 'Record Detail Block', formName: 'Storage', txt: 'text for CARD 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', formName: 'Record Title', txt: 'text for CARD 1', cols: 2, rows: 1 },
        { title: 'Card 2', formName: 'Collection Name', txt: 'text for CARD 2', cols: 1, rows: 1 },
        { title: 'Card 3', formName: 'Artist/Author', txt: 'text for CARD 3', cols: 1, rows: 2 },
        { title: 'Card 4', formName: 'Date of Return', txt: 'text for CARD four', cols: 1, rows: 1 },
        { title: 'Card 5', formName: 'Storage Name', txt: 'text for CARD four', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
