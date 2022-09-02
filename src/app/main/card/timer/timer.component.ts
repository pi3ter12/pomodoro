import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnChanges {
  @Input() seconds: number = 0;

  value: {minutes: string, seconds: string} = {
    minutes: '00',
    seconds: '00'
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.prepareValue();
  }

  private prepareValue(): void {
    const minutes = Math.floor(this.seconds / 60);
    const seconds = this.seconds - (minutes * 60);
    this.value = {
      minutes: this.formatValue(minutes),
      seconds: this.formatValue(seconds)
    }
  }

  private formatValue(value: number): string {
    return (value < 10) ? '0' + value : '' + value;
  }
}
