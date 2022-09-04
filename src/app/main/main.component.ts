import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {selectCurrentOption} from "../store/timer/timer.selectors";
import {CurrentOption} from "../store/timer/timer.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  selectedOption: CurrentOption = 'work'

  constructor(private store: Store) {
  }
  ngOnInit() {
    this.store.select(selectCurrentOption).pipe(
      tap(option => this.selectedOption = option)
    ).subscribe()
  }
}
