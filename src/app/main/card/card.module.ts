import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './card.component';
import {SharedModule} from "../../shared/shared.module";
import {ButtonComponent} from './button/button.component';
import {TimerComponent} from './timer/timer.component';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {FooterComponent} from './footer/footer.component';
import {NumberToListPipe} from './control-panel/pipe/number-to-list.pipe';
import {StepToRoundPipe} from './pipe/step-to-round.pipe';


@NgModule({
  declarations: [
    CardComponent,
    ButtonComponent,
    TimerComponent,
    ControlPanelComponent,
    FooterComponent,
    NumberToListPipe,
    StepToRoundPipe
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule {
}
