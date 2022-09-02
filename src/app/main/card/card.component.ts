import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrentOption, TimerService, TimerState} from "./timer/timer.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  selectedOption: CurrentOption = 'work';
  seconds: number = 0;
  step: number = 0;
  working: boolean = false;
  private stateChangeSubscription: Subscription | undefined;

  constructor(private timerService: TimerService) {
  }

  ngOnInit(): void {
    this.handleStateUpdate(this.timerService.getState());
    this.stateChangeSubscription = this.timerService.onStateChange
      .subscribe((state: TimerState) => this.handleStateUpdate(state));
  }

  ngOnDestroy() {
    if (this.stateChangeSubscription) {
      this.stateChangeSubscription.unsubscribe();
    }
  }

  public handleOptionChange(state: CurrentOption): void {
    this.timerService.setSelectedOption(state, true);
  }

  handleWorkingButton(start: boolean): void {
    this.timerService.changeWorking(start);
  }

  handleNavClick(isNext: boolean): void {
    this.timerService.changeStep(isNext);
  }

  private handleStateUpdate(state: TimerState): void {
    this.selectedOption = state.currentOption;
    this.seconds = state.time;
    this.working = state.working;
    this.step = state.currentStep;
  }
}
