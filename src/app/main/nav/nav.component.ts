import {Component} from '@angular/core';
import {selectCurrentOption} from "../../store/timer/timer.selectors";
import {Store} from "@ngrx/store";
import {tap} from "rxjs";
import {CurrentOption} from "../../store/timer/timer.model";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  selectedOption: CurrentOption = 'work'

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(selectCurrentOption).pipe(
      tap(option => this.selectedOption = option)
    ).subscribe()
  }
}
