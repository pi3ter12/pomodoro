import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrentOption, TimerService} from "./card/timer/timer.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  selectedOption: CurrentOption = 'work';
  private subscription: Subscription | undefined;

  constructor(private timerService: TimerService) {
  }

  ngOnInit(): void {
    this.selectedOption = this.timerService.getSelectedOption();
    this.subscription = this.timerService.onStateChange
      .subscribe(({currentOption}) => this.selectedOption = currentOption)
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
