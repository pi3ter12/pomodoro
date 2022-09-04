import {Component, OnInit} from '@angular/core';
import {FooterConf} from "../../../store/timer/timer.model";
import {Store} from "@ngrx/store";
import {selectFooterConf} from "../../../store/timer/timer.selectors";
import {tap} from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  conf: FooterConf | undefined;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(selectFooterConf)
      .pipe(tap(conf => this.conf = conf))
      .subscribe();
  }
}
