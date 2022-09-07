import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import {SharedModule} from "../../shared.module";



@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    InputComponent
  ]
})
export class InputModule { }
