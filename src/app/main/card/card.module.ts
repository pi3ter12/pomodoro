import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import {SharedModule} from "../../shared/shared.module";
import { ButtonComponent } from './button/button.component';
import { TimerComponent } from './timer/timer.component';



@NgModule({
  declarations: [
    CardComponent,
    ButtonComponent,
    TimerComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule { }
