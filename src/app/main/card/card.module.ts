import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import {SharedModule} from "../../shared/shared.module";
import { ButtonComponent } from './button/button.component';
import { TimerComponent } from './timer/timer.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    CardComponent,
    ButtonComponent,
    TimerComponent,
    ControlPanelComponent,
    FooterComponent
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
