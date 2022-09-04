import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CurrentOption} from "../../../store/timer/timer.model";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  @Input() working: boolean = false;
  @Input() rounds: number = 0;
  @Input() currentStep: number = 0;
  @Input() theme: CurrentOption = 'work';

  @Output() onStart: EventEmitter<void> = new EventEmitter<void>();
  @Output() onStop: EventEmitter<void> = new EventEmitter<void>();
  @Output() onNavClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onRoundChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  handleStart(): void {
    this.onStart.emit();
  }

  handleStop(): void {
    this.onStop.emit();
  }

  handleNavClick(next: boolean): void {
    this.onNavClick.emit(next);
  }

  handleRoundChange(value: number): void {
    this.onRoundChange.emit(value);
  }
}
