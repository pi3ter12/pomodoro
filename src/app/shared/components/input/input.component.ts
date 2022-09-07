import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() type: InputType = 'number';
  @Input() label: string = 'label';

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

}

export type InputType = 'number';
