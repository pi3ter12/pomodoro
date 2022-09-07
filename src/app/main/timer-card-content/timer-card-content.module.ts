import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimerCardContentComponent} from './timer-card-content.component';
import {SharedModule} from "../../shared/shared.module";
import {TimerComponent} from './timer/timer.component';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {FooterComponent} from './footer/footer.component';
import {NumberToListPipe} from './control-panel/pipe/number-to-list.pipe';
import {StepToRoundPipe} from './pipe/step-to-round.pipe';
import {BellComponent} from './bell/bell.component';
import {SettingsButtonComponent} from './settings-button/settings-button.component';
import {ButtonModule} from "../../shared/components/button/button.module";
import {CardModule} from "../../shared/components/card/card.module";


@NgModule({
  declarations: [
    TimerCardContentComponent,
    TimerComponent,
    ControlPanelComponent,
    FooterComponent,
    NumberToListPipe,
    StepToRoundPipe,
    BellComponent,
    SettingsButtonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    CardModule
  ],
  exports: [
    TimerCardContentComponent
  ]
})
export class TimerCardContentModule {
}
