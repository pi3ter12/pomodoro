import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input.component';
import {SharedModule} from "../../shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    InputComponent
  ]
})
export class InputModule {
}
