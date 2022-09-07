import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectCurrentOption} from "../../../store/timer/timer.selectors";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() isSelected: boolean = false;

  @Input() buttonType: ButtonType = 'option';

  @Output() isClicked: EventEmitter<void> = new EventEmitter<void>();

  currentOption = this.store.select(selectCurrentOption);

  constructor(private store: Store) {
  }

  handleClick(): void {
    this.isClicked.emit();
  }
}

export type ButtonType = 'option' | 'round' | 'control' | 'nav';
