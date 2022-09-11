import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() type: InputType = 'number';
  @Input() label: string = 'label';
  @Input() control: FormControl | null = null;
}

export type InputType = 'number';
