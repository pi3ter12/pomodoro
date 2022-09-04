import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() isSelected: boolean = false;
  @Output() isClicked: EventEmitter<void> = new EventEmitter<void>();

  handleClick(): void {
    this.isClicked.emit();
  }
}
