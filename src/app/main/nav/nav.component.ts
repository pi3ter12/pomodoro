import {Component, OnDestroy, OnInit} from '@angular/core';
import {selectCurrentOption} from "../../store/timer/timer.selectors";
import {Store} from "@ngrx/store";
import {ReplaySubject, takeUntil, tap} from "rxjs";
import {CurrentOption} from "../../store/timer/timer.model";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  selectedOption: CurrentOption = 'work'
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(selectCurrentOption).pipe(
      tap(option => this.selectedOption = option),
      takeUntil(this.destroyed$)
    ).subscribe()
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
