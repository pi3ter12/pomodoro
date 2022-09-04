import {Component, OnDestroy, OnInit} from '@angular/core';
import {FooterConf} from "../../../store/timer/timer.model";
import {Store} from "@ngrx/store";
import {selectFooterConf} from "../../../store/timer/timer.selectors";
import {ReplaySubject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  conf: FooterConf | undefined;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(selectFooterConf).pipe(
      tap(conf => this.conf = conf),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
