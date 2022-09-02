import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  @Input() working: boolean = false;

  @Output() onStart: EventEmitter<void> = new EventEmitter<void>();
  @Output() onStop: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  handleStart(): void {
    this.onStart.emit();
  }

  handleStop(): void {
    this.onStop.emit();
  }
}
